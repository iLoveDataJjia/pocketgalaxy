from typing import Literal

from pydantic import BaseModel


class PostgreSQLIDto(BaseModel):
    name: str
    type: Literal["postgresql"]
    host: str
    port: int
    database: str
    user: str
    password: str | None


class MySQLIDto(BaseModel):
    name: str
    type: Literal["mysql"]
    host: str
    port: int
    database: str
    user: str
    password: str | None


ConnectionIDto = PostgreSQLIDto | MySQLIDto


class ConnectionODto(BaseModel):
    id: int
    name: str
    type: Literal["postgresql", "mysql"]
    updated_at: int


class TestStatusODto(BaseModel):
    is_up: bool


class CountDataFramesODto(BaseModel):
    count: int
