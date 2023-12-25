import uvicorn
from adapters.controllers.connections.connections_ctrl import (
    ConnectionsCtrl,
    connections_ctrl_impl,
)
from adapters.controllers.helpers.response_helper import (
    ResponseHelper,
    response_helper_impl,
)
from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI


class ApiDriver:
    def __init__(
        self,
        response_helper: ResponseHelper,
        connections_rts: ConnectionsCtrl,
        env_loader_driver: EnvLoaderDriver,
    ) -> None:
        self.connections_rts = connections_rts
        self.env_loader_driver = env_loader_driver
        self.response_helper = response_helper

        self.app = FastAPI(title="PocketGalaxy")
        self.app.include_router(self.connections_rts.router())
        self.response_helper.set_cors_when_not_prod(self.app)

    def run(self) -> None:
        if self.env_loader_driver.prod_mode:
            uvicorn.run(
                app=self.app,
                host="localhost",
                port=self.env_loader_driver.api_port,
                log_level="info",
                access_log=False,
            )
        else:
            uvicorn.run(
                app="drivers.api_driver:_",
                host="localhost",
                port=self.env_loader_driver.api_port,
                log_level="info",
                access_log=False,
                reload=True,
                reload_dirs="./src",
            )


api_driver_impl = ApiDriver(
    response_helper_impl, connections_ctrl_impl, env_laoder_driver_impl
)
_ = None if env_laoder_driver_impl.prod_mode else api_driver_impl.app
