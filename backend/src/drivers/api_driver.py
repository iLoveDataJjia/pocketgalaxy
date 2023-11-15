import uvicorn
from adapters.routes.connections.connections_rts import (
    ConnectionsRts,
    connections_rts_impl,
)
from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI


class ApiDriver:
    def __init__(
        self, env_loader: EnvLoaderDriver, connections_rts: ConnectionsRts
    ) -> None:
        self.env_loader = env_loader
        self.app = FastAPI(title="SparKaiKu")
        self.app.include_router(connections_rts.router())

    def run(self) -> None:
        if self.env_loader.prod_mode:
            uvicorn.run(
                app=self.app,
                host="0.0.0.0",
                port=self.env_loader.api_port,
                log_level="info",
            )
        else:
            uvicorn.run(
                app="drivers.api_driver:app",
                host="0.0.0.0",
                port=self.env_loader.api_port,
                log_level="info",
                reload=True,
                reload_dirs="./src",
            )


api_driver_impl = ApiDriver(env_laoder_driver_impl, connections_rts_impl)
app = None if env_laoder_driver_impl.prod_mode else api_driver_impl.app
