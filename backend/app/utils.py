import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "C:\\Users\\crump\\Desktop\\project\\backend\\uploads"

# Создаем папку, если она не существует
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def save_avatar(file: UploadFile):
    # Генерация уникального имени файла
    file_extension = file.filename.split(".")[-1]  # Получаем расширение файла
    filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return filename  # Возвращаем только имя файла