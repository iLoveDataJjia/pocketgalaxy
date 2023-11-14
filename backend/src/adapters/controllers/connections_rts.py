from typing import List, Literal

from fastapi import APIRouter, FastAPI
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


class ConnectionODto(BaseModel):
    id: int
    name: str
    type: Literal["postgresql", "mysql"]
    updated_at: int


class ConnectionsRts:
    def __init__(self) -> None:
        self.app = FastAPI()

        @self.app.get(
            summary="List connections",
            path="/connections",
            response_model=List[ConnectionODto],
        )
        def _():
            raise NotImplementedError

        @self.app.post(summary="Create a connection", path="/connections")
        def _(connection_idto: PostgreSQLIDto | MySQLIDto):
            raise NotImplementedError

        @self.app.put(
            summary="Update a connection",
            path="/connections/{connection_id}",
            response_model=ConnectionODto,
        )
        def _(connection_id: int, connection_idto: PostgreSQLIDto | MySQLIDto):
            raise NotImplementedError

        @self.app.delete(
            summary="Delete a connection",
            path="/connections/{connection_id}",
            response_model=List[ConnectionODto],
        )
        def _(connection_id: int):
            raise NotImplementedError

        @self.app.post(
            summary="Test status of a connection",
            path="/connections/{connection_id}/test-status",
            response_model=bool,
        )
        def _(connection_id: int):
            raise NotImplementedError

        @self.app.post(
            summary="Count dataframes of a connection",
            path="/connections/{connection_id}/count-dataframes",
            response_model=int,
        )
        def _(connection_id: int):
            raise NotImplementedError

    def router(self) -> APIRouter:
        return self.app.router


connections_rts_impl = ConnectionsRts()
