import os


class EnvLoaderDriver:
    def __init__(self) -> None:
        self.prod_mode = os.getenv("SPARKAIKU_PROD_MODE", False) == "True"
        self.api_port = os.getenv("SPARKAIKU_API_PORT", 8000)


env_laoder_driver_impl = EnvLoaderDriver()
