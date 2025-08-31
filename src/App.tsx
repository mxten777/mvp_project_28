
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


import Home from './pages/Home';
import Facilities from './pages/Facilities';
import Reservation from './pages/Reservation';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { auth } from './firebase';


function App() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>홈</Link>
      <Link to="/facilities" className="hover:underline" onClick={() => setMenuOpen(false)}>시설목록</Link>
      <Link to="/reservation" className="hover:underline" onClick={() => setMenuOpen(false)}>예약</Link>
      <Link to="/mypage" className="hover:underline" onClick={() => setMenuOpen(false)}>마이페이지</Link>
      <Link to="/admin" className="hover:underline" onClick={() => setMenuOpen(false)}>관리자</Link>
      {user ? (
        <>
          <span className="ml-4 text-gray-600">{user.email}</span>
          <button onClick={handleLogout} className="ml-2 text-red-500 underline">로그아웃</button>
        </>
      ) : (
        <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>로그인</Link>
      )}
    </>
  );

  return (
    <Router>
      <header className="bg-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-xl font-bold text-blue-700">공공시설예약</div>
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex gap-6 items-center text-base">
            {navLinks}
          </nav>
          {/* 모바일 햄버거 버튼 */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10" onClick={() => setMenuOpen(v => !v)} aria-label="메뉴 열기">
            <span className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* 모바일 메뉴 */}
        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-100 border-b">
            {navLinks}
          </nav>
        )}
      </header>
      <main className="min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="max-w-4xl mx-auto px-2 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
