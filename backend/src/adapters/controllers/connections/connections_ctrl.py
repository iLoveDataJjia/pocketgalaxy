from typing import List

from adapters.controllers.connections.dto import (
    ConnectionIDto,
    ConnectionODto,
    ConnectorInfoIDto,
    CountDataFramesODto,
    TestStatusODto,
)
from adapters.controllers.helpers.response_helper import (
    ResponseHelper,
    response_helper_impl,
)
from fastapi import APIRouter, FastAPI
from usecases.connections_usecase import ConnectionsUseCase, connections_usecase_impl


class ConnectionsCtrl:
    def __init__(
        self,
        connections_usecase: ConnectionsUseCase,
        response_helper: ResponseHelper,
    ) -> None:
        self.response_helper = response_helper
        self.connections_usecase = connections_usecase

        self._app = FastAPI()

        @self._app.get(
            summary="List connections",
            path="/connections",
            responses=self.response_helper.response_model_of(List[ConnectionODto]),
        )
        def _():
            return self.response_helper.response_of(
                lambda: self.connections_usecase.list()
            )

        @self._app.post(
            summary="Create a connection",
            path="/connections",
            responses=self.response_helper.response_model_of(List[ConnectionODto]),
        )
        def _(connection: ConnectionIDto):
            return self.response_helper.response_of(
                lambda: self.connections_usecase.create(connection)
            )

        @self._app.post(
            summary="Test status of a connection in creation",
            path="/connections/test-status",
            responses=self.response_helper.response_model_of(TestStatusODto),
        )
        def _(connector_info: ConnectorInfoIDto):
            return self.response_helper.response_of(
                lambda: self.connections_usecase.test(connector_info)
            )

        @self._app.put(
            summary="Update a connection",
            path="/connections/{connection_id}",
            responses=self.response_helper.response_model_of(List[ConnectionODto]),
        )
        def _(connection_id: int, connection_idto: ConnectionIDto):
            return self.response_helper.response_of(
                lambda: self.connections_usecase.update(connection_id, connection_idto)
            )

        @self._app.delete(
            summary="Delete a connection",
            path="/connections/{connection_id}",
            responses=self.response_helper.response_model_of(List[ConnectionODto]),
        )
        def _(connection_id: int):
            return self.response_helper.response_of(
                lambda: self.connections_usecase.delete(connection_id)
            )

        @self._app.get(
            summary="Test status of a connection",
            path="/connections/{connection_id}/test-status",
            responses=self.response_helper.response_model_of(TestStatusODto),
        )
        def _(connection_id: int):
            return self.response_helper.response_of(
                lambda: self.connections_usecase.test_defined(connection_id)
            )

        @self._app.post(
            summary="Count dataframes of a connection",
            path="/connections/{connection_id}/count-dataframes",
            responses=self.response_helper.response_model_of(CountDataFramesODto),
        )
        def _(connection_id: int):
            raise NotImplementedError

    def router(self) -> APIRouter:
        return self._app.router


connections_rts_impl = ConnectionsCtrl(
    connections_usecase_impl,
    response_helper_impl,
)
