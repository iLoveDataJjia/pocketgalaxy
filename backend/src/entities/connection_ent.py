from datetime import datetime
from typing import Literal

from adapters.routes.connections.dto import ConnectionIDto


class ConnectionEnt:
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
            return PostgreSqlEnt(
                connection_dto.name,
                is_up,
                connection_dto.connector_info.host,
                connection_dto.connector_info.port,
                connection_dto.connector_info.database,
                connection_dto.connector_info.user,
                connection_dto.connector_info.password,
            )
        elif connection_dto.connector_info.type == "mysql":
            return PostgreSqlEnt(
                connection_dto.name,
                is_up,
                connection_dto.connector_info.host,
                connection_dto.connector_info.port,
                connection_dto.connector_info.database,
                connection_dto.connector_info.user,
                connection_dto.connector_info.password,
            )


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
