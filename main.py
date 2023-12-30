from PIL import Image
import numpy as np
import face_recognition
import os
import cv2
import matplotlib
matplotlib.use('TkAgg')  # Use the TkAgg backend
import matplotlib.pyplot as plt

image = "DALL-E-girl.png"
img = cv2.imread(image)
imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)  # Compress the image
imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)  # Convert to RGB

facesCurFrame = face_recognition.face_locations(imgS)  # Detect face locations

scaling_factor = 4  # Scaling factor to map coordinates back to original image

# Apply blur to each detected face
for faceLoc in facesCurFrame:
    top, right, bottom, left = faceLoc
    top, right, bottom, left = [coordinate * scaling_factor for coordinate in [top, right, bottom, left]]  # Scale coordinates
    face = img[top:bottom, left:right]
    # Create a circular mask
    mask = np.zeros(face.shape[:2], dtype="uint8")
    centerY = (right - left) // 2
    centerX = (bottom - top) // 2
    radius = min(centerY, centerX)
    cv2.circle(mask, (centerY, centerX), radius, (255, 255, 255), -1)

    # Apply Gaussian Blur on the face
    face_blur = cv2.GaussianBlur(face, (99, 99), 30)

    # Combine the blurred face and the original face using the mask
    face_masked = np.where(mask[..., None].astype(bool), face_blur, face)

    img[top:bottom, left:right] = face_masked  # Replace the face region with circular blurred version


# Convert color (BGR to RGB) for displaying
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Show the image
plt.imshow(img_rgb)
plt.axis('off')
plt.show()
