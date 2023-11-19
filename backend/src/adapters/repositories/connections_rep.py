from datetime import datetime
from typing import Optional

from drivers.db_driver import db_driver_impl
from entities.connection_ent import ConnectionEnt, MySqlEnt, PostgreSqlEnt
from helpers.backend_exception import ServerException
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
            raise ServerException(
                f"Encountered an unexpected entity of type {type(entity)}."
            )

    def to_ent(self) -> ConnectionEnt:
        if isinstance(self, PostgreSqlRow):
            return self.to_ent()
        elif isinstance(self, MySqlRow):
            return self.to_ent()
        else:
            raise ServerException(
                f"Encountered an unexpected row of type {type(self)}."
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


class MySqlRow(ConnectionRow):
    __tablename__ = "connections_mysql"

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
    def from_ent(cls, entity: MySqlEnt) -> "MySqlRow":
        return MySqlRow(
            name=entity.name,
            is_up=entity.is_up,
            host=entity.host,
            port=entity.port,
            database=entity.database,
            user=entity.user,
            password=entity.password,
        )

    def to_ent(self) -> MySqlEnt:
        ent = MySqlEnt(
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


class ConnectionsRep:
    def list(self, session: Session):
        loader_opt = selectin_polymorphic(ConnectionRow, [PostgreSqlRow, MySqlRow])
        stmt = select(ConnectionRow).options(loader_opt)
        entities = [row.to_ent() for row in session.scalars(stmt).all()]
        return entities

    def save(self, session: Session, entity: ConnectionEnt):
        row = ConnectionRow.from_ent(entity)
        session.add(row)


connections_rep_impl = ConnectionsRep()
