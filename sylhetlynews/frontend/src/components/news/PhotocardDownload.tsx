import React from "react";

interface PhotocardDownloadProps {
  imageUrl: string;
  title: string;
}

const PhotocardDownload: React.FC<PhotocardDownloadProps> = ({ imageUrl, title }) => (
  <a href={imageUrl} download target="_blank" rel="noopener noreferrer">
    <button style={{ margin: 8, padding: 8, background: '#eee', border: '1px solid #ccc', borderRadius: 4 }}>
      Download Photocard: {title}
    </button>
  </a>
);

export default PhotocardDownload;
