from datetime import datetime
from typing import List, Optional

from drivers.db_driver import db_driver_impl
from entities.connection_ent import ConnectionEnt, MySqlEnt, PostgreSqlEnt
from helpers.backend_exception import (
    AbstractMethodException,
    BadRequestException,
    ServerInternalErrorException,
)
from sqlalchemy import ForeignKey, select
from sqlalchemy.orm import Mapped, Session, mapped_column, selectin_polymorphic
from sqlalchemy.sql.functions import now


class ConnectionRow(db_driver_impl.Base):
    __tablename__ = "connections"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True)
    updated_at: Mapped[datetime] = mapped_column(default=now(), onupdate=now())
    is_up: Mapped[bool]
    type: Mapped[str]

    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
        "polymorphic_on": "type",
    }

    @classmethod
    def from_ent(cls, entity: ConnectionEnt) -> "ConnectionRow":
        if isinstance(entity, PostgreSqlEnt):
            return PostgreSqlRow.from_ent(entity)
        elif isinstance(entity, MySqlEnt):
            return MySqlRow.from_ent(entity)
        else:
            raise ServerInternalErrorException(
                f"Encountered an unexpected entity of type {type(entity)}."
            )

    def to_ent(self) -> ConnectionEnt:
        raise AbstractMethodException

    def update_from_ent(self, _: ConnectionEnt) -> None:
        raise AbstractMethodException

    def _raise_cross_connection_type_update(self) -> None:
        raise BadRequestException(
            "Apologies, the system doesn't allow updates across different connection types. "
            + "To ensure smooth operations, updates should be made within the same connection type."
        )


class PostgreSqlRow(ConnectionRow):
    __tablename__ = "connections_postgresql"

    id: Mapped[int] = mapped_column(ForeignKey("connections.id"), primary_key=True)
    host: Mapped[str]
    port: Mapped[int]
    database: Mapped[str]
    user: Mapped[str]
    password: Mapped[Optional[str]]

    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    @classmethod
    def from_ent(cls, entity: PostgreSqlEnt) -> "PostgreSqlRow":
        return PostgreSqlRow(
            name=entity.name,
            is_up=entity.is_up,
            host=entity.host,
            port=entity.port,
            database=entity.database,
            user=entity.user,
            password=entity.password,
        )

    def to_ent(self) -> PostgreSqlEnt:
        ent = PostgreSqlEnt(
            self.name,
            self.is_up,
            self.host,
            self.port,
            self.database,
            self.user,
            self.password,
        )
        ent.id = self.id
        ent.updated_at = self.updated_at
        return ent

    def update_from_ent(self, entity: ConnectionEnt) -> None:
        if isinstance(entity, PostgreSqlEnt):
            self.name = entity.name
            self.is_up = entity.is_up
            self.host = entity.host
            self.port = entity.port
            self.database = entity.database
            self.user = entity.user
            self.password = entity.password
        else:
            self._raise_cross_connection_type_update()


class MySqlRow(ConnectionRow):
    __tablename__ = "connections_mysql"

    id: Mapped[int] = mapped_column(ForeignKey("connections.id"), primary_key=True)
    host: Mapped[str]
    port: Mapped[int]
    user: Mapped[str]
    password: Mapped[str]

    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    @classmethod
    def from_ent(cls, entity: MySqlEnt) -> "MySqlRow":
        return MySqlRow(
            name=entity.name,
            is_up=entity.is_up,
            host=entity.host,
            port=entity.port,
            user=entity.user,
            password=entity.password,
        )

    def to_ent(self) -> MySqlEnt:
        ent = MySqlEnt(
            self.name,
            self.is_up,
            self.host,
            self.port,
            self.user,
            self.password,
        )
        ent.id = self.id
        ent.updated_at = self.updated_at
        return ent

    def update_from_ent(self, entity: ConnectionEnt) -> None:
        if isinstance(entity, MySqlEnt):
            self.name = entity.name
            self.is_up = entity.is_up
            self.host = entity.host
            self.port = entity.port
            self.user = entity.user
            self.password = entity.password
        else:
            self._raise_cross_connection_type_update()


class ConnectionsRep:
    def list(self, session: Session) -> List[ConnectionEnt]:
        loader_opt = selectin_polymorphic(ConnectionRow, [PostgreSqlRow, MySqlRow])
        stmt = select(ConnectionRow).options(loader_opt)
        entities = [row.to_ent() for row in session.scalars(stmt).all()]
        return entities

    def save(self, session: Session, entity: ConnectionEnt) -> None:
        row = ConnectionRow.from_ent(entity)
        session.add(row)

    def delete(self, session: Session, connection_id: int) -> None:
        row = self._get_or_raise_when_connection_not_found(session, connection_id)
        session.delete(row)

    def get(self, session: Session, connection_id: int) -> ConnectionEnt:
        return self._get_or_raise_when_connection_not_found(
            session, connection_id
        ).to_ent()

    def update(self, session: Session, entity: ConnectionEnt) -> None:
        row = self._get_or_raise_when_connection_not_found(session, entity.id)
        row.update_from_ent(entity)

    def _get_or_raise_when_connection_not_found(
        self, session: Session, connection_id: int
    ) -> ConnectionRow:
        loader_opt = selectin_polymorphic(ConnectionRow, [PostgreSqlRow, MySqlRow])
        stmt = (
            select(ConnectionRow)
            .options(loader_opt)
            .where(ConnectionRow.id == connection_id)
        )
        row = session.scalars(stmt).one_or_none()
        if row:
            return row
        else:
            raise BadRequestException(
                f"The connection associated with the provided ID ({connection_id}) does not exist."
            )


connections_rep_impl = ConnectionsRep()
