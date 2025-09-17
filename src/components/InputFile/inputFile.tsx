import '../../styles/inputFile.scss';
import React, { useState, useRef } from 'react';

interface InputFileProps {
  onFileLoaded: (newKeypoints: any) => void;
}

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export const InputFile: React.FC<InputFileProps> = ({ onFileLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }

    if (fileInputRef.current && e.dataTransfer.files) {
      fileInputRef.current.files = e.dataTransfer.files;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // onFileLoaded();
    if (file) {
      setStatus('uploading');

      const formData = new FormData();
      formData.append('file', file);
      console.log('file', file);

      try {
        // const result = await fetch('http://127.0.0.1:8000/api/keypoints/', {
        //   method: 'POST',
        //   body: formData,
        // });

        // const result = await fetch('http://127.0.0.1:8000/api/', {
        //   method: 'GET',
        // });

        // const newKeypoints = await result.json();

        // console.log(newKeypoints);
        setStatus('success');
        // onFileLoaded(newKeypoints);
        onFileLoaded({
          frame_1: [
            { keypoint: 'nose', position: { x: 10, y: 20 } },
            { keypoint: 'eye', position: { x: 15, y: 25 } },
          ],
        });
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };

  return (
    <div className="input-file__container container">
      <div
        className={`input-file__block   ${file ? 'input-file__block-big' : 'input-file__block-sm'}`}
        ref={dropContainerRef}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <label htmlFor="file" className="input-file__input">
          <span className="input-file__input-title">Перенесите файл</span>
          или
          <input id="file" type="file" onChange={handleFileChange} ref={fileInputRef} />
        </label>

        {file && (
          <section className="input-file__info">
            <h2 className="input-file__info-title ">Информация о файле</h2>
            <ul className="input-file__ul">
              <li className="input-file__li">
                <p className="input-file__info-text">Название</p>
                {file.name}
              </li>
              <li className="input-file__li">
                <p className="input-file__info-text">Тип</p>
                {file.type}
              </li>
              <li className="input-file__li">
                <p className="input-file__info-text">Размер</p>
                {file.size} bytes
              </li>
            </ul>
            {file && (
              <button onClick={handleUpload} className="input-file__submit">
                Загрузить
              </button>
            )}
            <Result status={status} />
          </section>
        )}
      </div>
    </div>
  );
};
export default InputFile;
