from typing import List

from adapters.routes.connections.dto import ConnectionIDto, ConnectionODto
from loguru import logger


class ConnectionsUseCase:
    @logger.catch
    def list_connections() -> List[ConnectionODto]:
        raise NotImplementedError

    @logger.catch
    def create_connection(connection_idto: ConnectionIDto) -> List[ConnectionODto]:
        raise NotImplementedError


connections_usecase_impl = ConnectionsUseCase()
