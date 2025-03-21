import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/organizations/`)
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  return (
    <div>
      <h1>Организации</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Аватар</th>
            <th>Почта</th>
            <th>Название</th>
            <th>Список</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map(org => (
            <tr key={org.id}>
              <td>
                <img 
                  src={`http://localhost:8000/uploads/${org.avatar}`} 
                  alt="Аватар" 
                  width="50" 
                  height="50" 
                />
              </td>
              <td>{org.email}</td>
              <td>{org.name}</td>
              <td>{org.tags}</td>
              <td>{org.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;