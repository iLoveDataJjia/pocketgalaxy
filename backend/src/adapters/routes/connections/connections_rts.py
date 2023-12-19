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
from helpers.backend_exception import BadRequestException, reponse_model_of
from sqlalchemy.exc import IntegrityError
from usecases.connections_usecase import ConnectionsUseCase, connections_usecase_impl


class ConnectionsRts:
    def __init__(
        self, db_driver: DbDriver, connections_usecase: ConnectionsUseCase
    ) -> None:
        self.db_driver = db_driver
        self.connections_usecase = connections_usecase

        self._app = FastAPI()

        @self._app.get(
            summary="List connections",
            path="/connections",
            responses=reponse_model_of(List[ConnectionODto]),
        )
        def _():
            with self.db_driver.get_session() as session:
                return self.connections_usecase.list(session)

        @self._app.post(
            summary="Create a connection",
            path="/connections",
            responses=reponse_model_of(List[ConnectionODto]),
        )
        def _(connection: ConnectionIDto):
            try:
                with self.db_driver.get_session() as session:
                    return self.connections_usecase.create(session, connection)
            except IntegrityError as e:
                self._raiseWhenNameAlreadyUtilized(e)

        @self._app.post(
            summary="Test status of a connection in creation",
            path="/connections/test-status",
            responses=reponse_model_of(TestStatusODto),
        )
        def _(connector_info: ConnectorInfoIDto):
            return self.connections_usecase.test(connector_info)

        @self._app.put(
            summary="Update a connection",
            path="/connections/{connection_id}",
            responses=reponse_model_of(List[ConnectionODto]),
        )
        def _(connection_id: int, connection_idto: ConnectionIDto):
            try:
                with self.db_driver.get_session() as session:
                    return self.connections_usecase.update(
                        session, connection_id, connection_idto
                    )
            except IntegrityError as e:
                self._raiseWhenNameAlreadyUtilized(e)

        @self._app.delete(
            summary="Delete a connection",
            path="/connections/{connection_id}",
            responses=reponse_model_of(List[ConnectionODto]),
        )
        def _(connection_id: int):
            with self.db_driver.get_session() as session:
                return self.connections_usecase.delete(session, connection_id)

        @self._app.get(
            summary="Test status of a connection",
            path="/connections/{connection_id}/test-status",
            responses=reponse_model_of(TestStatusODto),
        )
        def _(connection_id: int):
            with self.db_driver.get_session() as session:
                return self.connections_usecase.test_defined(session, connection_id)

        @self._app.post(
            summary="Count dataframes of a connection",
            path="/connections/{connection_id}/count-dataframes",
            responses=reponse_model_of(CountDataFramesODto),
        )
        def _(connection_id: int):
            raise NotImplementedError

    def router(self) -> APIRouter:
        return self._app.router

    def _raiseWhenNameAlreadyUtilized(self, e: IntegrityError) -> None:
        raise (
            BadRequestException("The connection name has already been utilized.")
            if e.args[0]
            == "(sqlite3.IntegrityError) UNIQUE constraint failed: connections.name"
            else e
        )


connections_rts_impl = ConnectionsRts(db_driver_impl, connections_usecase_impl)
