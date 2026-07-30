import React from 'react';
import { LayoutDashboard, Users, FolderKanban, BarChart3, Settings, HelpCircle, Layers } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Projects', path: '/projects', icon: FolderKanban },
  { title: 'Users', path: '/users', icon: Users },
  { title: 'Analytics', path: '/analytics', icon: BarChart3 },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Help & Support', path: '/help', icon: HelpCircle },
];

const Sidebar = ({ isCollapsed }) => {
  // Simulated active path - replace with useLocation() if using react-router-dom
  const currentPath = '/dashboard';

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar__logo-container">
        <div className="sidebar__logo-icon">
          <Layers size={24} />
        </div>
        {!isCollapsed && <span className="sidebar__logo-text">User Pannel</span>}
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <li key={item.path} className="sidebar__menu-item">
                <a
                  href={item.path}
                  className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                  title={isCollapsed ? item.title : ''}
                >
                  <Icon className="sidebar__link-icon" size={20} />
                  {!isCollapsed && <span className="sidebar__link-text">{item.title}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;