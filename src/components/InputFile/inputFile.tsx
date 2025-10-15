import { Button } from '@heroui/button';
import '../../styles/inputFile.scss';
import React, { useState, useRef } from 'react';
import Arrow from '/src/assets/img/Arrow.svg';
import { useMediaQuery } from '@mui/material';

interface InputFileProps {
  onFileLoaded: (newKeypoints: any) => void;
}

export const InputFile: React.FC<InputFileProps> = ({ onFileLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [_status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [_isDragActive, setIsDragActive] = useState(false);

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

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setStatus('initial');
  //     setFile(e.target.files[0]);
  //   }
  // };
  // Обработчик выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleCancel = () => {
    // очищаем выбранный файл из состояния
    setFile(null);
    // очищаем значение input через ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    // onFileLoaded();
    if (file) {
      setStatus('uploading');

      const formData = new FormData();
      formData.append('video', file);
      formData.append('type', 'auto');
      formData.append('save_video', 'true');
      console.log('file', file);

      try {
        // const result = await fetch('https://back-api-1-1x9p.onrender.com/api/keypoints', {
        //   method: 'POST',
        //   body: formData,
        // });
        // console.log(result);
        // const result = await fetch('https://03aeedf19961.ngrok-free.app/analyze', {
        //   method: 'POST',
        //   body: formData,
        // });
        // console.log(result);

        // const result = await fetch('http://127.0.0.1:8000/api/', {
        //   method: 'GET',
        // });

        // Старый без параметров
        // const result = await fetch('https://mocki.io/v1/05cca9d5-8014-4841-94ab-f899d2cf2af9', {
        //   method: 'GET',
        // });

        // Весь файл
        const result = await fetch('https://mocki.io/v1/3279e0b8-66ff-44a5-a73a-5270d0379909', {
          method: 'GET',
        });

        const newKeypoints = await result.json();

        console.log(newKeypoints);
        setStatus('success');
        onFileLoaded(newKeypoints);
        // onFileLoaded({
        //   frame_1: [
        //     { keypoint: 'nose', position: { x: 10, y: 20 } },
        //     { keypoint: 'eye', position: { x: 15, y: 25 } },
        //   ],
        // });
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };
  // const handleUpload = async () => {
  //   if (!file) {
  //     alert('Пожалуйста, выберите файл для загрузки.');
  //     return;
  //   }

  //   setStatus('uploading');

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log('file', file);

  //   try {
  //     const response = await fetch('https://back-api-c3ns.onrender.com/api/keypoints', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     // Проверка успешности ответа
  //     if (!response.ok) {
  //       throw new Error(`Ошибка: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     console.log(data);
  //     setStatus('success');
  //     onFileLoaded(data);
  //     console.log('Ответ сервера:', data);
  //   } catch (error) {
  //     console.error('Ошибка загрузки файла:', error);
  //     setStatus('fail');
  //   }
  // };
  const isSmallScreen = useMediaQuery('(max-width:500px)');

  return (
    <div className="input-file__container container">
      <div
        className={`input-file__block   ${file ? 'input-file__block-big' : 'input-file__block-sm'}`}
        ref={dropContainerRef}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <label
          htmlFor="file"
          className={`input-file__input ${isSmallScreen && file ? 'hidden' : ''}`}>
          <span className="input-file__input-title">Перенесите файл</span>
          или
          <input id="file" type="file" onChange={handleFileChange} ref={fileInputRef} />
        </label>

        {file && (
          <section className="input-file__info">
            <h2 className="input-file__info-title ">Выбранный файл</h2>
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
              <div className="input-file__btns">
                <Button
                  color="default"
                  className="input-file__btn-cls"
                  variant="ghost"
                  onClick={handleCancel}>
                  Отменить
                </Button>
                <Button
                  color="default"
                  className="input-file__btn"
                  variant="ghost"
                  onClick={handleUpload}>
                  Загрузить
                  <img src={Arrow} alt="" />
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
export default InputFile;
