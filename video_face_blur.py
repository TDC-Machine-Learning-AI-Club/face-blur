import cv2
import numpy as np
import face_recognition


# Desired FPS for video display
desired_fps = 60  # Adjust this value as needed

# Calculate the interval in milliseconds between frames for the desired FPS
frame_interval = int(1000 / desired_fps)


# Function to apply circular blur on faces
def apply_circular_blur(img, scaling_factor=4):
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    facesCurFrame = face_recognition.face_locations(imgS)

    for faceLoc in facesCurFrame:
        top, right, bottom, left = faceLoc
        top, right, bottom, left = [coordinate * scaling_factor for coordinate in [top, right, bottom, left]]

        face = img[top:bottom, left:right]
        mask = np.zeros(face.shape[:2], dtype="uint8")
        centerY, centerX = (right - left) // 2, (bottom - top) // 2
        radius = min(centerY, centerX)
        cv2.circle(mask, (centerY, centerX), radius, (255, 255, 255), -1)

        face_blur = cv2.GaussianBlur(face, (257, 257), 60)
        face_masked = np.where(mask[..., None].astype(bool), face_blur, face)
        img[top:bottom, left:right] = face_masked

    return img

# Path to the input video
video_path = 'pexels-1.mp4'

# Open the video
cap = cv2.VideoCapture(video_path)

# Prepare to write the output video
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('pexels-blurred.avi', fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Apply the circular blur function to each frame
    processed_frame = apply_circular_blur(frame)

    # Write the frame to the output video
    out.write(processed_frame)

    # Resize the frame for display
    display_frame = cv2.resize(processed_frame, (0, 0), fx=1/5, fy=1/5)

    # Display the frame
    cv2.imshow('Video', display_frame)
    if cv2.waitKey(frame_interval) & 0xFF == ord('q'):  # Press 'q' to quit
        break

# Release the video objects
cap.release()
out.release()
cv2.destroyAllWindows()
