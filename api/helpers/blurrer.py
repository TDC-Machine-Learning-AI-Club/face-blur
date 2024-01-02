from PIL import Image
import numpy as np
import face_recognition
import os
import cv2
import matplotlib
matplotlib.use('TkAgg')  # Use the TkAgg backend
import matplotlib.pyplot as plt
import uuid

class FaceBlurrer:
    def __init__(self, image_path):
        self.image_path = image_path
        self.img = cv2.imread(image_path)
        self.imgS = cv2.resize(self.img, (0, 0), None, 0.25, 0.25)  # Compress the image
        self.imgS = cv2.cvtColor(self.imgS, cv2.COLOR_BGR2RGB)  # Convert to RGB

    def _apply_blur_to_face(self, face):
        mask = np.zeros(face.shape[:2], dtype="uint8")
        centerY = face.shape[1] // 2
        centerX = face.shape[0] // 2
        radius = min(centerY, centerX)
        cv2.circle(mask, (centerY, centerX), radius, (255, 255, 255), -1)

        face_blur = cv2.GaussianBlur(face, (99, 99), 30)

        return np.where(mask[..., None].astype(bool), face_blur, face)

    def blur_faces(self):
        faces_cur_frame = face_recognition.face_locations(self.imgS)

        scaling_factor = 4

        for face_loc in faces_cur_frame:
            top, right, bottom, left = [coordinate * scaling_factor for coordinate in face_loc]  # Scale coordinates
            face = self.img[top:bottom, left:right]
            face_masked = self._apply_blur_to_face(face)
            self.img[top:bottom, left:right] = face_masked

        '''

        img_rgb = cv2.cvtColor(self.img, cv2.COLOR_BGR2RGB)

        plt.imshow(img_rgb)
        plt.axis('off')
        plt.show()

        '''
    

    def save_result(self, file_extension, output_directory='images/output', prefix='blurred_image') -> str:
        # Generate a unique filename using uuid.uuid4()
        image_uuid : str = uuid.uuid4()
        unique_filename = f"{prefix}_{image_uuid}{file_extension}"
        output_path = os.path.join(output_directory, unique_filename)
        
        cv2.imwrite(output_path, self.img)

        return image_uuid
