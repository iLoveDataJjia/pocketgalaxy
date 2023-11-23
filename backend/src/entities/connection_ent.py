from abc import ABC, abstractmethod
from datetime import datetime
from typing import Literal

from adapters.routes.connections.dto import (
    ConnectionIDto,
    MySqlInfoIDto,
    PostgreSqlInfoIDto,
)
from helpers.backend_exception import AbstractMethodException


class ConnectionEnt(ABC):
    def __init__(
        self, type: Literal["postgresql", "mysql"], name: str, is_up: bool
    ) -> None:
        self.type: Literal["postgresql", "mysql"] = type
        self.id: int
        self.name = name
        self.updated_at: datetime
        self.is_up = is_up

    @classmethod
    def from_dto(cls, connection_dto: ConnectionIDto, is_up: bool) -> "ConnectionEnt":
        if connection_dto.connector_info.type == "postgresql":
            return PostgreSqlEnt.from_dto(
                connection_dto.name, is_up, connection_dto.connector_info
            )
        elif connection_dto.connector_info.type == "mysql":
            return MySqlEnt.from_dto(
                connection_dto.name, is_up, connection_dto.connector_info
            )
        else:
            raise NotImplementedError

    @abstractmethod
    def to_idto(self) -> ConnectionIDto:
        pass

    def update(self, entity: "ConnectionEnt") -> "ConnectionEnt":
        entity.id = self.id
        return entity


class PostgreSqlEnt(ConnectionEnt):
    def __init__(
        self,
        name: str,
        is_up: bool,
        host: str,
        port: int,
        database: str,
        user: str,
        password: str | None,
    ) -> None:
        super().__init__("postgresql", name, is_up)
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

    @classmethod
    def from_dto(
        cls, name: str, is_up: bool, postgresql_info: PostgreSqlInfoIDto
    ) -> "PostgreSqlEnt":
        return PostgreSqlEnt(
            name,
            is_up,
            postgresql_info.host,
            postgresql_info.port,
            postgresql_info.database,
            postgresql_info.user,
            postgresql_info.password,
        )

    def to_idto(self) -> ConnectionIDto:
        return ConnectionIDto(
            name=self.name,
            connector_info=PostgreSqlInfoIDto(
                type=self.type,
                host=self.host,
                port=self.port,
                database=self.database,
                user=self.user,
                password=self.password,
            ),
        )


class MySqlEnt(ConnectionEnt):
    def __init__(
        self,
        name: str,
        is_up: bool,
        host: str,
        port: int,
        database: str,
        user: str,
        password: str | None,
    ) -> None:
        super().__init__("mysql", name, is_up)
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

    @classmethod
    def from_dto(
        cls, name: str, is_up: bool, mysql_info: MySqlInfoIDto
    ) -> "MySqlInfoIDto":
        return MySqlEnt(
            name,
            is_up,
            mysql_info.host,
            mysql_info.port,
            mysql_info.database,
            mysql_info.user,
            mysql_info.password,
        )

    def to_idto(self) -> ConnectionIDto:
        return ConnectionIDto(
            name=self.name,
            connector_info=MySqlInfoIDto(
                type=self.type,
                host=self.host,
                port=self.port,
                database=self.database,
                user=self.user,
                password=self.password,
            ),
        )
