from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Organization

# Удаляем все таблицы
Base.metadata.drop_all(bind=engine)

# Создаем все таблицы заново
Base.metadata.create_all(bind=engine)

# Создаем сессию для работы с базой данных
db = SessionLocal()

# Добавляем тестовые данные
try:
    db.add(Organization(
        avatar="1.jpg",
        email="org1@example.com",
        name="Организация 1",
        tags="тег1, тег2, тег3",
        description="Это описание организации 1."
    ))
    db.add(Organization(
        avatar="2.jpg",
        email="org2@example.com",
        name="Организация 2",
        tags="тег4, тег5",
        description="Это описание организации 2."
    ))
    db.commit()
    print("Тестовые данные успешно добавлены!")
except Exception as e:
    db.rollback()
    print(f"Ошибка при добавлении данных: {e}")
finally:
    db.close()