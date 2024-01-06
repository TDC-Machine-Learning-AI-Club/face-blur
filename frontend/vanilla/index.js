const express = require('express');
const path = require('path');
const axios = require('axios');
const BASE_URL = 'http://127.0.0.1:8000/'



async function ProcessImage(imageSource) {
  const apiUrl = BASE_URL + 'local-blurrer';
  const postData = {
    image_source: imageSource,
  };

  try {
    const response = await axios.post(apiUrl, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('POST request successful:', response.data);

    // Return the public_url from the response
    return response.data.public_url;
  } catch (error) {
    console.error('Error making POST request:', error.message);
    // Handle the error or propagate it as needed
    throw error;
  }
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 8090;

const upload = require('./upload')

app.post('/image-upload', upload.single('file'), (req, res) => {
  const fileName = req.file.filename;

  ProcessImage(fileName)
    .then(public_url => {
      console.log('Public URL:', public_url);

      // Render the HTML page with the processed image URL using EJS
      res.render('result', { public_url });
    })
    .catch(error => {
      console.error('Error:', error);

      // Redirect to an error page or handle the error as needed
      res.redirect('/error');
    });
});

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/script.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/utilities/script.js'));
});
  app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/utilities/style.css'));
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);