import uvicorn
from adapters.routes.connections.connections_rts import (
    ConnectionsRts,
    connections_rts_impl,
)
from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI


class ApiDriver:
    def __init__(
        self, connections_rts: ConnectionsRts, env_loader_driver: EnvLoaderDriver
    ) -> None:
        self._connections_rts = connections_rts
        self._env_loader_driver = env_loader_driver
        self._app = FastAPI(title="SparKaiKu")
        self._app.include_router(self._connections_rts.router())

    def run(self) -> None:
        if self._env_loader_driver.prod_mode:
            uvicorn.run(
                app=self._app,
                host="0.0.0.0",
                port=self._env_loader_driver.api_port,
                log_level="info",
            )
        else:
            uvicorn.run(
                app="drivers.api_driver:_",
                host="0.0.0.0",
                port=self._env_loader_driver.api_port,
                log_level="info",
                reload=True,
                reload_dirs="./src",
            )


api_driver_impl = ApiDriver(connections_rts_impl, env_laoder_driver_impl)
_ = None if env_laoder_driver_impl.prod_mode else api_driver_impl._app
