from typing import List

from adapters.repositories.connections_rep import ConnectionsRep, connections_rep_impl
from adapters.routes.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    ConnectorInfoIDto,
    TestStatusODto,
)
from drivers.services.mysql_driver import MySqlDriver, mysql_driver_impl
from drivers.services.postgresql_driver import PostgreSqlDriver, postgresql_driver_impl
from entities.connection_ent import ConnectionEnt
from helpers.backend_exception import ClientException
from sqlalchemy.orm import Session


class ConnectionsUseCase:
    def __init__(
        self,
        connections_rep: ConnectionsRep,
        postgresql_driver: PostgreSqlDriver,
        mysql_driver: MySqlDriver,
    ) -> None:
        self.connections_rep = connections_rep
        self.postgresql_driver = postgresql_driver

    def list(self, session: Session) -> List[ConnectionODto]:
        return [
            ConnectionODto(
                type=ent.type,
                id=ent.id,
                name=ent.name,
                updated_at=ent.updated_at,
                is_up=ent.is_up,
            )
            for ent in self.connections_rep.list(session)
        ]

    def create(
        self, session: Session, connection: ConnectionIDto
    ) -> List[ConnectionODto]:
        self._raiseUnlessConnectionIsUp(connection.connector_info)
        ent = ConnectionEnt.from_dto(connection, True)
        self.connections_rep.save(session, ent)
        return self.list(session)

    def test(self, connector_info: ConnectorInfoIDto) -> TestStatusODto:
        if connector_info.type == "postgresql":
            status = self.postgresql_driver.test_status(connector_info)
        elif connector_info.type == "mysql":
            status = self.mysql_driver.test_status(connector_info)
        else:
            raise NotImplementedError
        return TestStatusODto(is_up=status)

    def update(
        self, session: Session, connection_id: int, connection_idto: ConnectionIDto
    ) -> List[ConnectionODto]:
        self._raiseUnlessConnectionIsUp(connection_idto.connector_info)
        new_ent = ConnectionEnt.from_dto(connection_idto, True)
        ent = self.connections_rep.get(session, connection_id).update(new_ent)
        self.connections_rep.update(session, ent)
        return self.list(session)

    def delete(self, session: Session, connection_id: int) -> List[ConnectionODto]:
        self.connections_rep.delete(session, connection_id)
        return self.list(session)

    def test_defined(self, session: Session, connection_id: int) -> TestStatusODto:
        connection = self.connections_rep.get(session, connection_id)
        return self.test(connection.to_idto().connector_info)

    def _raiseUnlessConnectionIsUp(self, connector_info: ConnectorInfoIDto) -> None:
        if not self.test(connector_info).is_up:
            raise ClientException(
                "Your connection is currently unavailable. Please ensure it is operational before proceeding."
            )


connections_usecase_impl = ConnectionsUseCase(
    connections_rep_impl, postgresql_driver_impl, mysql_driver_impl
)
