import uvicorn
from adapters.routes.connections.connections_rts import (
    ConnectionsRts,
    connections_rts_impl,
)
from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from helpers.backend_exception import BadRequestException


class ApiDriver:
    def __init__(
        self, env_loader_driver: EnvLoaderDriver, connections_rts: ConnectionsRts
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
            if isinstance(e, BadRequestException):
                return JSONResponse(
                    status_code=400,
                    content={"detail": e.args[0]},
                    headers=headers,
                )
            elif not self.env_loader_driver.prod_mode:
                return JSONResponse(
                    status_code=500,
                    content={"detail": e.args[0]},
                    headers=headers,
                )
            else:
                return JSONResponse(
                    status_code=500,
                    content={
                        "detail": "Please try again later. If the issue persists, contact support."
                    },
                    headers=headers,
                )

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


api_driver_impl = ApiDriver(env_laoder_driver_impl, connections_rts_impl)
_ = None if env_laoder_driver_impl.prod_mode else api_driver_impl._app
