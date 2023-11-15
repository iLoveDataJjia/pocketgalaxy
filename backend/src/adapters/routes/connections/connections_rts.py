from typing import List

from adapters.routes.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    CountDataFramesODto,
    MySQLIDto,
    PostgreSQLIDto,
    TestStatusODto,
)
from fastapi import APIRouter, FastAPI
from loguru import logger
from usecases.connections_usecase import ConnectionsUseCase, connections_usecase_impl


class ConnectionsRts:
    def __init__(self, connections_usecase: ConnectionsUseCase) -> None:
        self._app = FastAPI()
        self.connections_usecase = connections_usecase

        @self._app.get(
            summary="List connections",
            path="/connections",
            response_model=List[ConnectionODto],
        )
        def _():
            return self.connections_usecase.list_connections()

        @self._app.post(
            summary="Create a connection",
            path="/connections",
            response_model=List[ConnectionODto],
        )
        def _(connection_idto: ConnectionIDto):
            return self.connections_usecase.create_connection(connection_idto)

        @self._app.put(
            summary="Test status of a connection in creation",
            path="/connections/test-status",
        )
        def _(connection_idto: ConnectionIDto):
            raise NotImplementedError

        @self._app.put(
            summary="Update a connection",
            path="/connections/{connection_id}",
            response_model=List[ConnectionODto],
        )
        def _(connection_id: int, connection_idto: ConnectionIDto):
            raise NotImplementedError

        @self._app.delete(
            summary="Delete a connection",
            path="/connections/{connection_id}",
            response_model=List[ConnectionODto],
        )
        def _(connection_id: int):
            raise NotImplementedError

        @self._app.put(
            summary="Test status of a connection",
            path="/connections/{connection_id}/test-status",
            response_model=TestStatusODto,
        )
        def _(connection_id: int):
            raise NotImplementedError

        @self._app.post(
            summary="Count dataframes of a connection",
            path="/connections/{connection_id}/count-dataframes",
            response_model=CountDataFramesODto,
        )
        def _(connection_id: int):
            raise NotImplementedError

    def router(self) -> APIRouter:
        return self._app.router


connections_rts_impl = ConnectionsRts(connections_usecase_impl)
