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
        from_attributes = True  # Заменяет orm_mode

class OrganizationResponse(Organization):
    pass
