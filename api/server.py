from helpers.blurrer import FaceBlurrer
from fastapi import FastAPI, HTTPException, Request, Depends
from helpers.downloader import ImgDownloader
import time
import os
from urllib.parse import urlparse

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False
    
def get_file_extension(file_path):
    _, file_extension = os.path.splitext(file_path)
    return file_extension


downloader = ImgDownloader()
app = FastAPI()

async def get_content_type(request: Request):
    """
    Get the content type from the request headers.

    """
    content_type = request.headers.get("content-type")
    if content_type != "application/json":
        raise HTTPException(status_code=415, detail="Unsupported Media Type: Only 'application/json' is supported")
    return content_type

@app.post("/local-blurrer")

async def blur_image(data: dict, content_type: str = Depends(get_content_type)):

    '''
    In this route we are expecting something like this
    {
        "image_source": "DALL-E-girl.png" OR "image_source": "https://myimages.com/blur-me.jpg"
    }
    Obviously we will add more support for file uploading and url downloading
    '''

    image_source = data["image_source"] # get the image name from post request

    if is_valid_url(image_source):

        downloaded_file : str  = downloader.download_image(image_source)

        image_path = f'images/input/{downloaded_file}' #join the path
        
    elif not is_valid_url(image_source):

        image_path = f'images/input/{image_source}' #join the path

    else:

        raise HTTPException(status_code=400, detail="Not image file or URL specified")

    start_time = time.time()
    
    '''Doing the magic'''
    face_blurrer = FaceBlurrer(image_path)
    face_blurrer.blur_faces()
    saved_img = face_blurrer.save_result()

    '''Getting output and returning response to client'''
    output_path = f'images/output/{saved_img}'

    end_time = time.time()

    elapsed_time = end_time - start_time

    return {"message": "process_completed", "saved_at": output_path, "elapsed_time": elapsed_time}
