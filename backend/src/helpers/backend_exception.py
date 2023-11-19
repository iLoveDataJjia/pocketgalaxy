class ClientException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)


class ServerException(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)
