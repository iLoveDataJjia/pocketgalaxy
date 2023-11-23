class ClientException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class ServerException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class AbstractMethodException(ServerException):
    def __init__(self) -> None:
        super().__init__(
            "Oops! Looks like there's an abstract method call. "
            + "Team's working on fixing this missing method. Hang tight!"
        )
