from typing import Any, Callable, Dict, Sequence

from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from helpers.backend_exception import BadRequestException
from pydantic import BaseModel


class ResponseHelper:
    def __init__(self, env_loader_driver: EnvLoaderDriver) -> None:
        self.env_loader_driver = env_loader_driver

    def response_model_of(
        self, model: type[BaseModel | Sequence[BaseModel]]
    ) -> Dict[int | str, Dict[str, Any]]:
        class BadRequestODto(BaseModel):
            detail: str

        class InternalServerErrorODto(BaseModel):
            detail: str

        response_models: Dict[int | str, Dict[str, Any]] = {
            200: {"model": model},
            400: {"model": BadRequestODto},
            500: {"model": InternalServerErrorODto},
        }
        return response_models

    def response_of(
        self,
        f: Callable[[], BaseModel | Sequence[BaseModel]],
    ) -> BaseModel | Sequence[BaseModel] | JSONResponse:
        try:
            return f()
        except Exception as e:
            if isinstance(e, BadRequestException):
                return JSONResponse(
                    status_code=400,
                    content={"detail": e.args[0]},
                    headers=self._enable_cors_header_when_not_prod({}),
                )
            elif not self.env_loader_driver.prod_mode:
                return JSONResponse(
                    status_code=500,
                    content={"detail": e.args[0]},
                    headers=self._enable_cors_header_when_not_prod({}),
                )
            else:
                return JSONResponse(
                    status_code=500,
                    content={
                        "detail": "Please try again later. If the issue persists, contact support."
                    },
                    headers=self._enable_cors_header_when_not_prod({}),
                )

    def set_cors_when_not_prod(self, app: FastAPI) -> None:
        if not self.env_loader_driver.prod_mode:
            app.add_middleware(
                CORSMiddleware,
                allow_origins=["*"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )

    def _enable_cors_header_when_not_prod(
        self, headers: Dict[str, str]
    ) -> Dict[str, str]:
        if not self.env_loader_driver.prod_mode:
            return {
                **headers,
                "access-control-allow-credentials": "true",
                "access-control-allow-origin": "*",
            }
        else:
            return headers


response_helper_impl = ResponseHelper(env_laoder_driver_impl)
