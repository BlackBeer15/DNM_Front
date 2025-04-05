import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModule.css';
import ParticleComponent from '../../components/ParticleComponent/ParticleComponent';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [init, setInit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Код для обработки формы авторизации
    navigate('/DashboardStart'); // ← Переход на другую страницу
  };

  // Запуск частиц после монтирования компонента
  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div className="login-form">
        <img src="images/logo.png" alt="Logo" className="logo-image" />
        <form onSubmit={handleSubmit}>
        <label>
            <p>Имя пользователя</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            <p>Пароль</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Войти</button>
        </form>
        {init && <ParticleComponent />}
    </div>
  );
};

export default Login;