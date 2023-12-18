import uvicorn
from adapters.routes.connections.connections_rts import (
    ConnectionsRts,
    connections_rts_impl,
)
from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from helpers.backend_exception import ClientException, ServerException


class ApiDriver:
    def __init__(
        self, connections_rts: ConnectionsRts, env_loader_driver: EnvLoaderDriver
    ) -> None:
        self.connections_rts = connections_rts
        self.env_loader_driver = env_loader_driver

        self._app = FastAPI(title="PocketGalaxy")
        if not self.env_loader_driver.prod_mode:
            self._app.add_middleware(
                CORSMiddleware,
                allow_origins=["*"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )
        self._app.include_router(self.connections_rts.router())

        @self._app.exception_handler(Exception)
        async def _(_: Request, e: Exception):
            headers = (
                {
                    "access-control-allow-credentials": "true",
                    "access-control-allow-origin": "*",
                }
                if not self.env_loader_driver.prod_mode
                else {}
            )
            if isinstance(e, ClientException):
                return JSONResponse(
                    status_code=400,
                    content={"detail": e.args[0]},
                    headers=headers,
                )
            elif isinstance(e, ServerException):
                return JSONResponse(
                    status_code=500,
                    content={"detail": e.args[0]},
                    headers=headers,
                )
            else:
                raise e

    def run(self) -> None:
        if self.env_loader_driver.prod_mode:
            return uvicorn.run(
                app=self._app,
                host="localhost",
                port=self.env_loader_driver.api_port,
                log_level="info",
                access_log=False,
            )
        else:
            return uvicorn.run(
                app="drivers.api_driver:_",
                host="localhost",
                port=self.env_loader_driver.api_port,
                log_level="info",
                access_log=False,
                reload=True,
                reload_dirs="./src",
            )


api_driver_impl = ApiDriver(connections_rts_impl, env_laoder_driver_impl)
_ = None if env_laoder_driver_impl.prod_mode else api_driver_impl._app
