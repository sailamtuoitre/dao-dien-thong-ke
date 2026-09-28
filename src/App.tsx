import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { UC11GradingPage } from './pages/UC11GradingPage';
import { UC12StatisticsPage } from './pages/UC12StatisticsPage';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <h2>Hệ thống Quản lý Thực tập</h2>
      <p>Chọn chức năng từ menu bên trái để bắt đầu.</p>
      <div className="home-cards">
        <NavLink to="/teacher/grading" className="home-card">
          <div className="card-icon">📝</div>
          <h3>Chấm điểm</h3>
          <p>Chấm điểm sinh viên thực tập (UC11)</p>
        </NavLink>
        <NavLink to="/admin/statistics" className="home-card">
          <div className="card-icon">📊</div>
          <h3>Thống kê</h3>
          <p>Thống kê kết quả thực tập (UC12)</p>
        </NavLink>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/teacher/grading') return 'UC11 — Chấm điểm sinh viên thực tập';
    if (location.pathname === '/admin/statistics') return 'UC12 — Thống kê kết quả';
    return 'Trang chủ';
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🎓 Quản lý TT</h2>
          <p>Internship Management</p>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-title">Giảng viên</div>
          <NavLink to="/teacher/grading" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">📝</span>
            Chấm điểm
          </NavLink>

          <div className="nav-section-title" style={{ marginTop: 16 }}>Quản trị viên</div>
          <NavLink to="/admin/statistics" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">📊</span>
            Thống kê kết quả
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="main-content">
        <header className="top-bar">
          <h1>{getPageTitle()}</h1>
          <div className="user-info">
            <div className="user-avatar">GV</div>
            <span>Người dùng</span>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teacher/grading" element={<UC11GradingPage />} />
            <Route path="/admin/statistics" element={<UC12StatisticsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
