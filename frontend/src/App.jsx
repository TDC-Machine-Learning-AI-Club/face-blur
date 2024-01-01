import { useState } from "react";

// Local imports
import Header from "./Header";
import Preview from "./Preview";

function App() {
  const [imgSrc, setImgSrc] = useState('')
  // const [imgSize, setImgSize] = useState('')
  // const [resultSrc, setResultSrc] = useState('')
  // const [resultSize, setResultSize] = useState('')

  const onImageUpload = async (e) => {
    // Get the file and update beforeSrc for previewing the image
    // and also upload it on remote server then get back the url and update resultSrc
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };

    // Upload the image to the server
    // const formData = new FormData();
    // formData.append("image", file);
    // const options = {
    //   method: "POST",
    //   body: formData,
    // };
    // const response = await fetch("SOME REMOTE SERVER URL", options);
    // const data = await response.json();
    // setResultSrc(data.url);
    // setResultSize(data.size);
    
  };

  return (
    <>
      <h1>Image Compression Tool</h1>
      <Header onImageUpload={onImageUpload} />
      <Preview
        beforeSrc={imgSrc} 
        // beforeSize={imgSize}
        // afterSrc={resultSrc}
        // afterSize={resultSize}
        />
    </>
  );
}

export default App;
