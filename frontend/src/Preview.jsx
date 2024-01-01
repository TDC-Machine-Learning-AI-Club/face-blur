const Preview = ({ beforeSrc, beforeSize, afterSrc, afterSize }) => {
  return (
    <div className="preview">
      {beforeSrc ? (
        <>
          <div className="img-box">
            {/* <div className="title">Before: {beforeSize}</div> */}
            <img className="preview-before" src={beforeSrc} alt="" />
          </div>
          {/* <div className="img-box">
            <div className="title">After: {afterSize}</div>
            <img className="preview-after" src={afterSrc} alt="" />
          </div> */}
        </>
      ) : (
        <div>please upload an image 🦖</div>
      )}
    </div>
  );
};

export default Preview;
