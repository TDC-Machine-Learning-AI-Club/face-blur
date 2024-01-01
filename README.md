# FACE BLUR APPLICATION
<img src="https://github.com/TDC-Machine-Learning-AI-Club/face-blur/blob/master/example-blurred.png" width="150" height="100">

Python code to apply blur effect on faces from images and videos.
Can be used in making content where subjects do not want to be recognized or identified.

### How it works
Faces are detected from images using _dlib face recognition_ library, then the detected coordinates are used as the _region of interest (roi)_ to apply gaussian blur using opencv.

### How to install dlib face_recognition libraries
On Linux/MacOS just install them directly using PIP

On windows follow this link https://docs.google.com/document/d/1sh3DIzhn1tqG4p_bfUvrBAsGAFnNGayQ/edit

