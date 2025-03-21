from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    avatar = Column(String)  # Путь к файлу аватара
    email = Column(String)   # Электронная почта
    name = Column(String)    # Название организации
    tags = Column(String)    # Список слов (например, "тег1, тег2, тег3")
    description = Column(Text)  # Описание