class BadRequestException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class ServerInternalErrorException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class AbstractMethodException(ServerInternalErrorException):
    def __init__(self) -> None:
        super().__init__("Oops! Looks like there's an abstract method call.")
