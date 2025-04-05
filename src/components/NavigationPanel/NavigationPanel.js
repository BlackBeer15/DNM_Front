import './NavigationPanelModule.css';
import { Link, NavLink } from 'react-router-dom';

const NavigationPanel = () => {
    return (
        <nav>
            <Link to='/DashboardStart' className='logo'>
                <img src='images/logo-long.png' alt='Docker Network Mapper' />
            </Link>
            <NavLink to='/DashboardStart' className='nav-btn'>
                <img src='images/Container.png' alt='Контейнеры' />
                <p>Контейнеры</p>
            </NavLink>
            <NavLink to='/Networks' className='nav-btn'>
                <img src='images/net.png' alt='Контейнеры' />
                <p>Сети</p>
            </NavLink>
            <NavLink to='/Monitoring' className='nav-btn'>
                <img src='images/Monitoring.png' alt='Контейнеры' />
                <p>Мониторинг</p>
            </NavLink>
            <p className='disclame'>Docker Network Mapper © <br/>Все права защищены</p>
        </nav>
    );
}

export default NavigationPanel