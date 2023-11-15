from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, relationship


class ConnectionsRep(DeclarativeBase):
    __tablename__ = "connections"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    postgresqls_rep = relationship("PostgreSqlsRep", cascade="all, delete-orphan")
    mysqls_rep = relationship("MySqlsRep", cascade="all, delete-orphan")


class PostgreSqlsRep(ConnectionsRep):
    __tablename__ = "connections_postgresql"

    id = Column(Integer, primary_key=True, index=True)
    host = Column(String)
    port = Column(Integer)
    database = Column(String)
    user = Column(String)
    password = Column(String)

    conn_id = Column(Integer, ForeignKey("connections.id"))


class MySqlsRep(ConnectionsRep):
    __tablename__ = "connections_postgresql"

    id = Column(Integer, primary_key=True, index=True)
    host = Column(String)
    port = Column(Integer)
    database = Column(String)
    user = Column(String)
    password = Column(String)

    conn_id = Column(Integer, ForeignKey("connections.id"))
