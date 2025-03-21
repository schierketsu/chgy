import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterRef = useRef(null);

  // Прокрутка к фильтрам
  const scrollToFilters = () => {
    filterRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Загрузка данных с бэкенда
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/organizations/`)
      .then(response => {
        setOrganizations(response.data);
        const tags = response.data.flatMap(org => org.tags.split(', '));
        setAllTags([...new Set(tags)]);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  // Фильтрация организаций
  const filteredOrganizations = organizations.filter(org => 
    selectedTags.length === 0 || selectedTags.some(tag => org.tags.split(', ').includes(tag))
  );

  return (
    <div>
      {/* Экран-заставка */}
      <div className="hero">
        <h1>Платформа для помощи в поиске практик студентам IT-направленности</h1>
        <button onClick={scrollToFilters}>Посмотреть уже сейчас</button>
      </div>

      {/* Фильтры */}
      <div ref={filterRef} className="filter-container">
        <div className="dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Выберите теги ▼</button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {allTags.map(tag => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => setSelectedTags(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )}
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="selected-tags">
          {selectedTags.map(tag => (
            <span key={tag} className="tag">
              {tag} <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}>×</button>
            </span>
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
            <th>Теги</th>
            <th>Описание</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrganizations.map(org => (
            <tr key={org.id}>
              <td>
                <img src={`http://localhost:8000/uploads/${org.avatar}`} alt="Аватар" width="50" height="50" />
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
