from typing import Any, Callable, Dict, Sequence

from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from fastapi.responses import JSONResponse
from helpers.backend_exception import BadRequestException
from pydantic import BaseModel


class ResponseHelper:
    def __init__(self, env_loader_driver: EnvLoaderDriver) -> None:
        self.env_loader_driver = env_loader_driver

    def response_model_of(self, model: type) -> Dict[int | str, Dict[str, Any]]:
        class OKODto(BaseModel):
            detail: str | None
            response: model

        class BadRequestODto(BaseModel):
            detail: str

        class InternalServerErrorODto(BaseModel):
            detail: str

        response_models: Dict[int | str, Dict[str, Any]] = {
            200: {"model": OKODto},
            400: {"model": BadRequestODto},
            500: {"model": InternalServerErrorODto},
        }
        return response_models

    def response_of(
        self,
        f: Callable[[], BaseModel | Sequence[BaseModel]],
        detail: str | None = None,
    ) -> "_OKODto | JSONResponse":
        headers = (
            {
                "access-control-allow-credentials": "true",
                "access-control-allow-origin": "*",
            }
            if not self.env_loader_driver.prod_mode
            else {}
        )
        try:
            response = f()
            response = (
                [e.model_dump() for e in response]
                if isinstance(response, Sequence)
                else response.model_dump()
            )
            return self._OKODto(detail=detail, response=response)
        except Exception as e:
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

    class _OKODto(BaseModel):
        detail: str | None
        response: dict | Sequence


response_helper_impl = ResponseHelper(env_laoder_driver_impl)
