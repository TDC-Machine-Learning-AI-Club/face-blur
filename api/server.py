from helpers.blurrer import FaceBlurrer
from fastapi import FastAPI, HTTPException, Request, Depends
from helpers.downloader import ImgDownloader
from helpers.uploader import upload_image_files
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

# api key authentication function 
async def get_api_key(request: Request):
    """
    Get the API key from the request headers.

    """
    api_key = request.headers.get("x-api-key")
    if api_key != os.environ.get('FRONTEND_API_KEY'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return api_key

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/image-blurrer")

async def blur_image(data: dict, content_type: str = Depends(get_content_type), api_key: str = Depends(get_api_key)):

    '''
    In this route we are expecting something like this
    {
        "image_url": "DALL-E-girl.png" OR "image_url": "https://myimages.com/blur-me.jpg"
    }
    Obviously we will add more support for file uploading and url downloading
    '''

    image_url = data["image_url"] # get the image name from post request

    if is_valid_url(image_url):

        downloaded_file : str  = downloader.download_image(image_url)

        if downloaded_file is None:
            raise HTTPException(status_code=400, detail="Error downloading image from provided URL")
            
        image_path = f'images/input/{downloaded_file}' #join the path
        file_extension = get_file_extension(image_path)
        
    elif not is_valid_url(image_url):

        image_path = f'images/input/{image_url}' #join the path
        file_extension = get_file_extension(image_path)

    else:

        raise HTTPException(status_code=400, detail="Not image file or URL specified")

    start_time = time.time()
    
    '''Doing the magic'''
    face_blurrer = FaceBlurrer(image_path)
    face_blurrer.blur_faces()
    saved_img = face_blurrer.save_result(file_extension)

    '''Getting output and returning response to client'''
    output_path = f'images/output/blurred_image_{saved_img}{file_extension}'

    end_time = time.time()
    elapsed_time = end_time - start_time
    
    blurred_image_url = upload_image_files(output_path).replace("?", "") #remove ? on blurred_image_url
    
    os.remove(output_path)
    os.remove(image_path)
    return {"message": "process_completed", "public_url": blurred_image_url, "elapsed_time": elapsed_time}