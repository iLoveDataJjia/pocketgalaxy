import uvicorn
from adapters.controllers.connections_rts import ConnectionsRts, connections_rts_impl
from drivers.env_loader import EnvLoader, env_laoder_impl
from fastapi import FastAPI


class APIDriver:
    def __init__(self, env_loader: EnvLoader, connections_rts: ConnectionsRts) -> None:
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


api_driver_impl = APIDriver(env_laoder_impl, connections_rts_impl)
app = None if env_laoder_impl.prod_mode else api_driver_impl.app
