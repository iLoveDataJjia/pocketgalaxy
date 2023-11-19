from typing import List

from adapters.repositories.connections_rep import ConnectionsRep, connections_rep_impl
from adapters.routes.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    ConnectorInfoIDto,
    TestStatusODto,
)
from drivers.services.postgresql_driver import PostgreSqlDriver, postgresql_driver_impl
from entities.connection_ent import ConnectionEnt
from helpers.backend_exception import ServerException
from loguru import logger
from sqlalchemy.orm import Session


class ConnectionsUseCase:
    def __init__(
        self,
        connections_rep: ConnectionsRep,
        postgresql_driver: PostgreSqlDriver,
    ) -> None:
        self.connections_rep = connections_rep
        self.postgresql_driver = postgresql_driver

    def list_connections(self, session: Session) -> List[ConnectionODto]:
        return [
            ConnectionODto(
                type=ent.type, id=ent.id, name=ent.name, updated_at=ent.updated_at
            )
            for ent in self.connections_rep.list(session)
        ]

    def create_connection(
        self, session: Session, connection: ConnectionIDto
    ) -> List[ConnectionODto]:
        if not self.test_connection(connection.connector_info).is_up:
            raise ServerException(
                "Your connection is currently unavailable. Please ensure it is operational before proceeding."
            )
        else:
            ent = ConnectionEnt.from_dto(connection, True)
            self.connections_rep.save(session, ent)
            return self.list_connections(session)

    def test_connection(self, connector_info: ConnectorInfoIDto) -> TestStatusODto:
        if connector_info.type == "postgresql":
            status = self.postgresql_driver.test_status(connector_info)
        else:
            raise NotImplementedError
        return TestStatusODto(is_up=status)


connections_usecase_impl = ConnectionsUseCase(
    connections_rep_impl, postgresql_driver_impl
)
