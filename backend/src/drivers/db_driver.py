import configparser
from contextlib import contextmanager
from typing import Generator

from drivers.env_loader_driver import EnvLoaderDriver, env_laoder_driver_impl
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session


class DbDriver:
    def __init__(self, env_loader_driver: EnvLoaderDriver) -> None:
        self.env_loader_driver = env_loader_driver

    class Base(DeclarativeBase):
        pass

    @contextmanager
    def get_session(self) -> Generator[Session, None, None]:
        config = configparser.ConfigParser()
        config.read("alembic.ini")
        with Session(
            create_engine(config["alembic"]["sqlalchemy.url"])
        ) as session, session.begin():
            yield session

    def migrate(self) -> None:
        raise NotImplementedError


db_driver_impl = DbDriver(env_laoder_driver_impl)
