import os
from supabase import create_client, Client
import logging
import sys
import mimetypes
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.
STORAGE_URL = os.environ.get('STORAGE_URL')
SUPABASE_API_KEY = os.environ.get('SUPABASE_API_KEY')
def get_mime_type(image_path):
    mime_type, _ = mimetypes.guess_type(image_path)
    return mime_type
supabase: Client = create_client(STORAGE_URL, SUPABASE_API_KEY)

def upload_image_files(filepath):
    content_type = get_mime_type(filepath)
    logging.disable(sys.maxsize)
    file_name = filepath.rsplit('/', 1)[-1]
    with open(filepath, 'rb') as f:

        supabase.storage.from_("imagesbucket").upload(file=f,path=file_name, file_options={"content-type": content_type})

        return supabase.storage.from_('imagesbucket').get_public_url(file_name)
        #this shall return a url just like this one https://hriwdlfljbreqtaymgfn.supabase.co/storage/v1/object/public/imagesbucket/DALL-E-AI-girl.png?

#print(upload_image_files('../images/input/DALL-E-AI-girl.png'))

