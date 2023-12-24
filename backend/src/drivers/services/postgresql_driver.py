import psycopg2
from adapters.controllers.connections.dto import PostgreSqlInfoIDto
from psycopg2 import OperationalError


class PostgreSqlDriver:
    def test_status(self, dto: PostgreSqlInfoIDto) -> bool:
        try:
            with psycopg2.connect(
                host=dto.host,
                port=dto.port,
                database=dto.database,
                user=dto.user,
                password=dto.password,
            ):
                return True
        except OperationalError:
            return False


postgresql_driver_impl = PostgreSqlDriver()
