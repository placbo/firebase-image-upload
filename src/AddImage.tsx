import React, { FC, useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export const AddImage: FC = () => {
  const navigate = useNavigate();
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!imageToUpload) return;
    console.log(imageToUpload.name);
    //todo - scale images
    //todo: save thumbs as well
    const storageRef = ref(storage, `images/${v4()}`);
    uploadBytes(storageRef, imageToUpload);
    return navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <h2>Add image file</h2>
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setImageToUpload(event.target.files && event.target.files[0]);
          }}
          id="myFile"
          name="filename"
        />
        <button className="dashboard__btn" onClick={handleSubmit} disabled={!imageToUpload}>
          Last opp
        </button>
      </div>
    </div>
  );
};
