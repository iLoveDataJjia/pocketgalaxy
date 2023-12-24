import pymysql
from adapters.controllers.connections.dto import MySqlInfoIDto


class MySqlDriver:
    def test_status(self, dto: MySqlInfoIDto) -> bool:
        try:
            with pymysql.connect(
                host=dto.host,
                port=dto.port,
                user=dto.user,
                password=dto.password,
            ) as connection:
                return connection.open
        except pymysql.Error:
            return False


mysql_driver_impl = MySqlDriver()
