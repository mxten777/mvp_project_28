
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


import Home from './pages/Home';
import Facilities from './pages/Facilities';
import FacilityDetail from './pages/FacilityDetail';
import Reservation from './pages/Reservation';
import ReservationDetail from './pages/ReservationDetail';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Notice from './pages/Notice';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import { auth } from './firebase';


function App() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = 'bg-gradient-to-br from-blue-50 to-green-50 min-h-screen font-sans';
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link to="/" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>홈</Link>
      <Link to="/facilities" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>시설목록</Link>
      <Link to="/reservation" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>예약</Link>
      <Link to="/mypage" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>마이페이지</Link>
      <Link to="/notice" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>공지사항</Link>
      <Link to="/faq" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>FAQ</Link>
      <Link to="/contact" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>문의</Link>
      <Link to="/admin" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>관리자</Link>
      {user ? (
        <>
          <span className="ml-4 text-gray-600 text-sm hidden sm:inline">{user.email}</span>
          <button onClick={handleLogout} className="ml-2 text-red-500 underline text-sm">로그아웃</button>
        </>
      ) : (
        <Link to="/login" className="px-2 py-2 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(false)}>로그인</Link>
      )}
    </>
  );
  return (
    <Router>
      {/* 헤더: 브랜드/네비/유저/모바일 메뉴 */}
      <header className="bg-white/90 shadow-lg sticky top-0 z-30 backdrop-blur border-b border-blue-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 gap-2">
          <Link to="/" className="flex items-center gap-2 group" aria-label="홈으로">
            <span className="text-2xl mr-1" role="img" aria-label="홈">🏠</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow group-hover:text-green-500 transition">공공시설예약</span>
            <span className="hidden sm:inline text-xs font-bold text-green-500 bg-green-100 rounded-full px-2 py-0.5 ml-1">ALL-IN-ONE</span>
          </Link>
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex gap-1 items-center text-base font-semibold">
            {navLinks}
          </nav>
          {/* 유저/모바일 메뉴 */}
          <div className="flex items-center gap-2">
            {user && (
              <span className="hidden sm:inline text-gray-600 text-sm font-medium bg-blue-50 rounded-full px-3 py-1 mr-1">{user.email}</span>
            )}
            {!menuOpen && (
              <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 transition" onClick={() => setMenuOpen(v => !v)} aria-label="메뉴 열기">
                <span className="block w-6 h-0.5 bg-blue-700 mb-1 transition-all"></span>
                <span className="block w-6 h-0.5 bg-blue-700 mb-1 transition-all"></span>
                <span className="block w-6 h-0.5 bg-blue-700 transition-all"></span>
              </button>
            )}
          </div>
        </div>
      </header>
      {/* 모바일 드로어 메뉴 */}
      {menuOpen && (
        <>
          {/* 오버레이 */}
          <div className="fixed inset-0 z-40 bg-black/40 animate-fadein" onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기" tabIndex={-1}></div>
          {/* 드로어 메뉴 */}
          <nav className="fixed top-4 left-0 z-50 w-[90vw] max-w-xs h-[calc(100%-1rem)] bg-gradient-to-br from-blue-100 via-emerald-50 to-emerald-100 border-r border-blue-200 rounded-r-3xl shadow-2xl flex flex-col px-4 pt-5 pb-8 animate-fadeinup focus:outline-none overflow-y-auto">
            <div className="flex items-center mb-6 px-1 relative">
              <span className="text-xl font-extrabold text-blue-700 tracking-tight">공공시설예약</span>
              <button onClick={() => setMenuOpen(false)} className="absolute right-0 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400 transition" aria-label="메뉴 닫기">
                <svg viewBox="0 0 24 24" width="28" height="28" className="text-blue-500" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-2 pt-2 text-base font-semibold">{navLinks}</div>
          </nav>
        </>
      )}
      <main className="min-h-[calc(100vh-64px)]">
        <div className="max-w-4xl mx-auto px-2 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facility/:id" element={<FacilityDetail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation-detail/:id" element={<ReservationDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
      {/* 글로벌 푸터 */}
      <footer className="w-full bg-gradient-to-r from-blue-50 to-green-50 border-t border-blue-100 mt-8 py-6 px-2 text-sm text-gray-700">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-extrabold text-blue-700 text-lg tracking-tight">공공시설예약</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()} mvp_project_28. All rights reserved.</span>
          </div>
          <nav className="flex flex-wrap gap-3 items-center text-blue-600 font-semibold">
            <Link to="/notice" className="hover:underline hover:text-green-500 transition">공지사항</Link>
            <Link to="/faq" className="hover:underline hover:text-green-500 transition">FAQ</Link>
            <Link to="/contact" className="hover:underline hover:text-green-500 transition">문의</Link>
            <a href="https://github.com/mxten777/mvp_project_28" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-500 transition">GitHub</a>
          </nav>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-2 sm:mt-0 bg-gradient-to-r from-blue-400 to-green-400 text-white px-4 py-2 rounded-full font-bold shadow hover:from-blue-500 hover:to-green-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="맨 위로 이동"
          >↑ 맨 위로</button>
        </div>
      </footer>
    </Router>
  );
}

export default App;
