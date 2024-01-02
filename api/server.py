from helpers.blurrer import FaceBlurrer
from fastapi import FastAPI, HTTPException, Request, Depends
import time

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
        "local_image": "DALL-E-girl.png"
    }
    Obviously we will add more support for file uploading and url downloading
    '''

    local_image = data["local_image"] # get the image name from post request

    image_path = f'images/input/{local_image}' #join the path

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
