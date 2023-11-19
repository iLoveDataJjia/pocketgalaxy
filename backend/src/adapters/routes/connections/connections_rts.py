from typing import List

from adapters.routes.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    ConnectorInfoIDto,
    CountDataFramesODto,
    TestStatusODto,
)
from drivers.db_driver import DbDriver, db_driver_impl
from fastapi import APIRouter, FastAPI
from usecases.connections_usecase import ConnectionsUseCase, connections_usecase_impl


class ConnectionsRts:
    def __init__(
        self, connections_usecase: ConnectionsUseCase, db_driver: DbDriver
    ) -> None:
        self._connections_usecase = connections_usecase
        self._db_driver = db_driver
        self._app = FastAPI()

        @self._app.get(
            summary="List connections",
            path="/connections",
            response_model=List[ConnectionODto],
        )
        def _():
            with self._db_driver.get_session() as session:
                return self._connections_usecase.list_connections(session)

        @self._app.post(
            summary="Create a connection",
            path="/connections",
            response_model=List[ConnectionODto],
        )
        def _(connection: ConnectionIDto):
            with self._db_driver.get_session() as session:
                return self._connections_usecase.create_connection(session, connection)

        @self._app.post(
            summary="Test status of a connection in creation",
            path="/connections/test-status",
            response_model=TestStatusODto,
        )
        def _(connector_info: ConnectorInfoIDto):
            return self._connections_usecase.test_connection(connector_info)

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

        @self._app.get(
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


connections_rts_impl = ConnectionsRts(connections_usecase_impl, db_driver_impl)
