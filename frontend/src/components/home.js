import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Загрузка данных с бэкенда
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/organizations/`)
      .then(response => {
        setOrganizations(response.data);

        // Собираем все уникальные теги
        const tags = response.data.flatMap(org => org.tags.split(', '));
        setAllTags([...new Set(tags)]); // Убираем дубликаты
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  // Фильтрация организаций по выбранным тегам
  const filteredOrganizations = organizations.filter(org => {
    if (selectedTags.length === 0) return true; // Если теги не выбраны, показываем все
    const orgTags = org.tags.split(', ');
    return selectedTags.some(tag => orgTags.includes(tag));
  });

  // Обработчик изменения выбора тегов
  const handleTagChange = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Удаление выбранного тега
  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="container">
      <h1>Организации</h1>

      {/* Фильтр по тегам */}
      <div className="filter-container">
        {/* Выпадающий список */}
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Выберите теги ▼
          </button>

          {isDropdownOpen && (
            <div className="dropdown-content">
              {allTags.map(tag => (
                <div key={tag} style={{ marginBottom: '5px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Выбранные теги */}
        <div className="selected-tags">
          {selectedTags.map(tag => (
            <div key={tag} className="tag">
              <span>{tag}</span>
              <button onClick={() => removeTag(tag)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Таблица с организациями */}
      <table>
        <thead>
          <tr>
            <th>Аватар</th>
            <th>Почта</th>
            <th>Название</th>
            <th>Список</th>
            <th>Описание</th>
            <th>Действие</th> {/* Новая колонка */}
          </tr>
        </thead>
        <tbody>
          {filteredOrganizations.map(org => (
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
              <td>
              <Link to={`/organization/${org.id}`}>
                <button>Подробнее</button>
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;