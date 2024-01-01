const Header = ({ onImageUpload }) => {
  return (
    <div className="header">
      <label for="upload" className="btn">
        upload 🎩
      </label>
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        id="upload"
        onChange={onImageUpload}
      />
      {/* {pct && (
        <div className="btn" onClick={onDownload}>
          download ✨
        </div>
      )}
      {pct && (
        <div className="compress-text">
          compressed the file size by &nbsp;<span>{pct}%</span>
        </div>
      )} */}
    </div>
  );
};

export default Header;
