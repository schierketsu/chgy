from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Organization  # <-- Импортируем модель из models, а не из schemas
from app.schemas import OrganizationResponse  # <-- Это схема ответа
from app.utils import save_avatar

router = APIRouter()

# Эндпоинт для получения списка организаций
@router.get("/organizations/", response_model=list[OrganizationResponse])
def get_organizations(db: Session = Depends(get_db)):
    organizations = db.query(Organization).all()  # <-- Тут должен быть models.Organization
    return organizations

# Эндпоинт для создания новой организации
@router.post("/organizations/", response_model=OrganizationResponse)
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
    db_organization = Organization(
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

# Эндпоинт для получения информации об одной организации
@router.get("/organizations/{organization_id}", response_model=OrganizationResponse)
def get_organization(organization_id: int, db: Session = Depends(get_db)):
    organization = db.query(Organization).filter(Organization.id == organization_id).first()
    if not organization:
        raise HTTPException(status_code=404, detail="Организация не найдена")
    return organization
