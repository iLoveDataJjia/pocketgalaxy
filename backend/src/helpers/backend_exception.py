from typing import Any, Dict

from pydantic import BaseModel


class BadRequestException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class ServerInternalErrorException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


def reponse_model_of(model: type) -> Dict[int, Dict[str, Any]]:
    class BadRequestODto(BaseModel):
        detail: str

    class InternalServerErrorODto(BaseModel):
        detail: str

    backend_exception_responses = {
        400: {"model": BadRequestODto},
        500: {"model": InternalServerErrorODto},
    }
    return {**backend_exception_responses, 200: {"model": model}}


class AbstractMethodException(ServerInternalErrorException):
    def __init__(self) -> None:
        super().__init__("Oops! Looks like there's an abstract method call.")
