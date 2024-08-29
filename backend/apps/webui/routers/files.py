import logging
import os
import shutil
import uuid
from pathlib import Path
from typing import Optional

from apps.webui.models.files import (
    Files,
    FileForm,
    FileModel,
)
from config import SRC_LOG_LEVELS, UPLOAD_DIR
from constants import ERROR_MESSAGES
from fastapi import APIRouter
from fastapi import (
    Depends,
    HTTPException,
    status,
    UploadFile,
    File,
)
from fastapi.responses import FileResponse
from utils.utils import get_verified_user, get_admin_user

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["MODELS"])

router = APIRouter()


############################
# Upload File
############################


@router.post("/")
def upload_file(file: UploadFile = File(...), user=Depends(get_verified_user)):
    log.info(f"file.content_type: {file.content_type}")
    try:
        unsanitized_filename = file.filename
        filename = os.path.basename(unsanitized_filename)

        # replace filename with uuid
        id = str(uuid.uuid4())
        name = filename
        filename = f"{id}_{filename}"
        file_path = f"{UPLOAD_DIR}/{filename}"

        contents = file.file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
            f.close()

        file = Files.insert_new_file(
            user.id,
            FileForm(
                **{
                    "id": id,
                    "filename": filename,
                    "meta": {
                        "name": name,
                        "content_type": file.content_type,
                        "size": len(contents),
                        "path": file_path,
                    },
                }
            ),
        )

        if file:
            return file
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error uploading file"),
            )

    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


# Model Image
@router.post("/model/images/")
def upload_file(file: UploadFile = File(...), user=Depends(get_admin_user)):
    log.info(f"file.content_type: {file.content_type}")
    try:
        unsanitized_filename = file.filename
        filename = os.path.basename(unsanitized_filename)

        name = filename
        file_path = f"{UPLOAD_DIR}/model/image/{filename}"

        contents = file.file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
            f.close()

        file = {
            "filename": filename,
            "meta": {
                "name": name,
                "content_type": file.content_type,
                "size": len(contents),
                "path": file_path,
            },
        }

        if file:
            return file
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error uploading model image"),
            )

    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


############################
# List Files
############################


@router.get("/", response_model=list[FileModel])
async def list_files(user=Depends(get_verified_user)):
    if user.role == "admin":
        files = Files.get_files()
    else:
        files = Files.get_files_by_user_id(user.id)
    return files


############################
# Delete All Files
############################


@router.delete("/all")
async def delete_all_files(user=Depends(get_admin_user)):
    result = Files.delete_all_files()

    if result:
        folder = f"{UPLOAD_DIR}"
        try:
            # Check if the directory exists
            if os.path.exists(folder):
                # Iterate over all the files and directories in the specified directory
                for filename in os.listdir(folder):
                    file_path = os.path.join(folder, filename)
                    try:
                        if os.path.isfile(file_path) or os.path.islink(file_path):
                            os.unlink(file_path)  # Remove the file or link
                        elif os.path.isdir(file_path):
                            shutil.rmtree(file_path)  # Remove the directory
                    except Exception as e:
                        print(f"Failed to delete {file_path}. Reason: {e}")
            else:
                print(f"The directory {folder} does not exist")
        except Exception as e:
            print(f"Failed to process the directory {folder}. Reason: {e}")

        return {"message": "All files deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT("Error deleting files"),
        )


############################
# Get File By Id
############################


@router.get("/{id}", response_model=Optional[FileModel])
async def get_file_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)

    if file and (file.user_id == user.id or user.role == "admin"):
        return file
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )


############################
# Get File Content By Id
############################


@router.get("/{id}/content", response_model=Optional[FileModel])
async def get_file_content_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)

    if file and (file.user_id == user.id or user.role == "admin"):
        file_path = Path(file.meta["path"])

        # Check if the file already exists in the cache
        if file_path.is_file():
            print(f"file_path: {file_path}")
            return FileResponse(file_path)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=ERROR_MESSAGES.NOT_FOUND,
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )


@router.get("/{id}/preview", response_model=Optional[FileModel])
async def get_file_content_by_id(id: str):
    file = Files.get_file_by_id(id)

    if file:
        file_path = Path(file.meta["path"])

        # Check if the file already exists in the cache
        if file_path.is_file():
            print(f"file_path: {file_path}")
            return FileResponse(file_path)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=ERROR_MESSAGES.NOT_FOUND,
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )


@router.get("/model/images/{file_path}", response_model=Optional[FileModel])
async def get_file_content_by_id(file_path: str):
    # Check if the file already exists in the path
    if file_path.is_file():
        print(f"file_path: {file_path}")
        return FileResponse(file_path)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )


@router.get("/{id}/content/{file_name}", response_model=Optional[FileModel])
async def get_file_content_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)

    if file and (file.user_id == user.id or user.role == "admin"):
        file_path = Path(file.meta["path"])

        # Check if the file already exists in the cache
        if file_path.is_file():
            print(f"file_path: {file_path}")
            return FileResponse(file_path)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=ERROR_MESSAGES.NOT_FOUND,
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )


############################
# Delete File By Id
############################


@router.delete("/{id}")
async def delete_file_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
    if file and (file.user_id == user.id or user.role == "admin"):
        result = Files.delete_file_by_id(id)
        if result:
            return {"message": "File deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error deleting file"),
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
