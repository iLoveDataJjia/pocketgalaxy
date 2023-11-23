import pymysql
from adapters.routes.connections.dto import MySqlInfoIDto


class MySqlDriver:
    def test_status(self, mysql_conn_dto: MySqlInfoIDto) -> bool:
        try:
            with pymysql.connect(
                host=mysql_conn_dto.host,
                port=mysql_conn_dto.port,
                database=mysql_conn_dto.database,
                user=mysql_conn_dto.user,
                password=mysql_conn_dto.password,
            ) as connection:
                return connection.open
        except pymysql.Error:
            return False


mysql_driver_impl = MySqlDriver()
