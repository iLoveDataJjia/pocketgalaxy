from typing import List

from adapters.controllers.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    ConnectorInfoIDto,
    TestStatusODto,
)
from adapters.repositories.connections_rep import ConnectionsRep, connections_rep_impl
from drivers.db_driver import DbDriver, db_driver_impl
from drivers.services.mysql_driver import MySqlDriver, mysql_driver_impl
from drivers.services.postgresql_driver import PostgreSqlDriver, postgresql_driver_impl
from entities.connection_ent import ConnectionEnt
from helpers.backend_exception import BadRequestException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


class ConnectionsUseCase:
    def __init__(
        self,
        connections_rep: ConnectionsRep,
        db_driver: DbDriver,
        postgresql_driver: PostgreSqlDriver,
        mysql_driver: MySqlDriver,
    ) -> None:
        self.connections_rep = connections_rep
        self.db_driver = db_driver
        self.postgresql_driver = postgresql_driver
        self.mysql_driver = mysql_driver

    def list(self) -> List[ConnectionODto]:
        with self.db_driver.get_session() as session:
            return self._list(session)

    def create(self, connection: ConnectionIDto) -> List[ConnectionODto]:
        def create_from_entity(ent: ConnectionEnt) -> List[ConnectionODto]:
            try:
                with self.db_driver.get_session() as session:
                    self.connections_rep.save(session, ent)
                    return self._list(session)
            except IntegrityError as e:
                raise self._build_name_already_utilized_exception(e)

        self._raise_unless_connection_is_up(connection.connector_info)
        ent = ConnectionEnt.from_dto(connection, True)
        return create_from_entity(ent)

    def test(self, connector_info: ConnectorInfoIDto) -> TestStatusODto:
        if connector_info.type == "postgresql":
            status = self.postgresql_driver.test_status(connector_info)
        elif connector_info.type == "mysql":
            status = self.mysql_driver.test_status(connector_info)
        else:
            raise NotImplementedError
        return TestStatusODto(is_up=status)

    def update(
        self, connection_id: int, connection_idto: ConnectionIDto
    ) -> List[ConnectionODto]:
        def update_with_entity(new_ent: ConnectionEnt) -> List[ConnectionODto]:
            try:
                with self.db_driver.get_session() as session:
                    ent = self.connections_rep.get(session, connection_id).update(
                        new_ent
                    )
                    self.connections_rep.update(session, ent)
                    return self._list(session)
            except IntegrityError as e:
                raise self._build_name_already_utilized_exception(e)

        self._raise_unless_connection_is_up(connection_idto.connector_info)
        new_ent = ConnectionEnt.from_dto(connection_idto, True)
        return update_with_entity(new_ent)

    def delete(self, connection_id: int) -> List[ConnectionODto]:
        with self.db_driver.get_session() as session:
            self.connections_rep.delete(session, connection_id)
            return self._list(session)

    def test_defined(self, connection_id: int) -> TestStatusODto:
        with self.db_driver.get_session() as session:
            connection = self.connections_rep.get(session, connection_id)
        return self.test(connection.to_idto().connector_info)

    def _list(self, session: Session) -> List[ConnectionODto]:
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

    def _raise_unless_connection_is_up(self, connector_info: ConnectorInfoIDto) -> None:
        if not self.test(connector_info).is_up:
            raise BadRequestException("Connection is incorrect or down.")

    def _build_name_already_utilized_exception(
        self, e: IntegrityError
    ) -> BadRequestException | IntegrityError:
        return (
            BadRequestException("The connection name has already been utilized.")
            if e.args[0]
            == "(sqlite3.IntegrityError) UNIQUE constraint failed: connections.name"
            else e
        )


connections_usecase_impl = ConnectionsUseCase(
    connections_rep_impl, db_driver_impl, postgresql_driver_impl, mysql_driver_impl
)
