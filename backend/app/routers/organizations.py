from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..utils import save_avatar

router = APIRouter()

# Эндпоинт для получения списка организаций
@router.get("/organizations/", response_model=list[schemas.Organization])
def get_organizations(db: Session = Depends(get_db)):
    organizations = db.query(models.Organization).all()
    return organizations

# Эндпоинт для создания новой организации
@router.post("/organizations/", response_model=schemas.Organization)
def create_organization(
    name: str,
    email: str,
    tags: str,
    description: str,
    avatar: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Сохраняем аватар и получаем имя файла
    avatar_filename = save_avatar(avatar)

    # Создаем запись в базе данных
    db_organization = models.Organization(
        avatar=avatar_filename,
        email=email,
        name=name,
        tags=tags,
        description=description
    )
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization