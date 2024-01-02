import requests

class ImgDownloader:
    def __init__(self):
        pass
    
    def download_image(self, url):
        local_filename = url.split('/')[-1]
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            # os.chdir('../documents')
            with open(f'images/input/{local_filename}', 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        # os.chdir(curr_dir)
        return local_filename