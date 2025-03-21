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
        name="ООО «ЭКРА ИТ»",
        tags="тег1, тег2, тег3",
        description="Это описание организации ООО «ЭКРА ИТ»."
    ))
    db.add(Organization(
        avatar="2.jpg",
        email="org2@example.com",
        name="ООО «Команда F5»",
        tags="тег4, тег5",
        description="Это описание организации ООО «Команда F5»."
    ))
    db.add(Organization(
        avatar="3.jpg",
        email="org3@example.com",
        name="ООО «Кейсистемс»",
        tags="тег4, тег5",
        description="Это описание организации ООО «Кейсистемс»."
    ))
    db.commit()
    print("Тестовые данные успешно добавлены!")
except Exception as e:
    db.rollback()
    print(f"Ошибка при добавлении данных: {e}")
finally:
    db.close()