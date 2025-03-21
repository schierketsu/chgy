import React, { useState } from 'react';
import axios from 'axios';

const OrganizationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('tags', tags);
    formData.append('description', description);
    formData.append('avatar', avatar);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/organizations/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Организация создана:', response.data);
    } catch (error) {
      console.error('Ошибка при создании организации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Теги" value={tags} onChange={(e) => setTags(e.target.value)} />
      <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
      <button type="submit">Создать</button>
    </form>
  );
};

export default OrganizationForm;