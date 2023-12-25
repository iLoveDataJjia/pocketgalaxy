from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class PostgreSqlInfoIDto(BaseModel):
    type: Literal["postgresql"]
    host: str
    port: int
    database: str
    user: str
    password: str | None


class MySqlInfoIDto(BaseModel):
    type: Literal["mysql"]
    host: str
    port: int
    user: str
    password: str


ConnectorInfoIDto = PostgreSqlInfoIDto | MySqlInfoIDto


class ConnectionIDto(BaseModel):
    name: str
    connector_info: ConnectorInfoIDto


class ConnectionODto(BaseModel):
    type: Literal["postgresql", "mysql"]
    id: int
    name: str
    updated_at: datetime
    is_up: bool


class TestStatusODto(BaseModel):
    is_up: bool


class CountDataFramesODto(BaseModel):
    count: int
