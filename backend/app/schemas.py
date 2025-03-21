from pydantic import BaseModel

class OrganizationBase(BaseModel):
    avatar: str
    email: str
    name: str
    tags: str
    description: str

class OrganizationCreate(OrganizationBase):
    pass

class Organization(OrganizationBase):
    id: int

    class Config:
        from_attributes = True  # Заменяем orm_mode на from_attributes