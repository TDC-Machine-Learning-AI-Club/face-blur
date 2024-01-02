import os

def get_file_extension(file_path):
    _, file_extension = os.path.splitext(file_path)
    return file_extension

# Example usage:
file_path = "images/DALL-E-girl.png"
extension = get_file_extension(file_path)
print(extension)
