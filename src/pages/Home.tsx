import React from 'react';

const Home = () => (
  <section className="w-full min-h-[70vh] flex flex-col justify-center items-center px-2 py-8 sm:py-16">
    <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-10 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-4 text-center drop-shadow leading-tight">
        <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">공공시설 예약</span><br />통합 플랫폼
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center font-medium">시군구 주민 누구나 쉽고 빠르게 공공시설을 예약하고, 다양한 복지·공유 서비스를 누릴 수 있는 올인원 웹앱입니다.</p>
      <ul className="mb-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 시설 예약 */}
        <li className="group bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm flex flex-col items-center min-h-[120px] transition hover:shadow-lg hover:bg-blue-100 active:scale-[0.98] focus-within:ring-2 focus-within:ring-blue-400">
          <span className="text-3xl text-blue-400 mb-2">🏛️</span>
          <span className="font-bold text-blue-800 text-base mb-1">시설 예약</span>
          <span className="text-gray-700 text-sm text-center leading-snug">회의실, 체육관, 강당 등<br className="hidden sm:inline"/> 다양한 공공시설을 한 곳에서 예약</span>
        </li>
        {/* 실시간 현황 */}
        <li className="group bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm flex flex-col items-center min-h-[120px] transition hover:shadow-lg hover:bg-green-100 active:scale-[0.98] focus-within:ring-2 focus-within:ring-green-400">
          <span className="text-3xl text-green-400 mb-2">⏰</span>
          <span className="font-bold text-blue-800 text-base mb-1">실시간 현황</span>
          <span className="text-gray-700 text-sm text-center leading-snug">예약 가능 시간, 위치,<br className="hidden sm:inline"/> 상세정보 즉시 확인</span>
        </li>
        {/* 내 예약 관리 */}
        <li className="group bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm flex flex-col items-center min-h-[120px] transition hover:shadow-lg hover:bg-blue-100 active:scale-[0.98] focus-within:ring-2 focus-within:ring-blue-400">
          <span className="text-3xl text-blue-400 mb-2">📋</span>
          <span className="font-bold text-blue-800 text-base mb-1">내 예약 관리</span>
          <span className="text-gray-700 text-sm text-center leading-snug">마이페이지에서 예약 내역·취소·변경</span>
        </li>
        {/* 관리자 기능 */}
        <li className="group bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm flex flex-col items-center min-h-[120px] transition hover:shadow-lg hover:bg-green-100 active:scale-[0.98] focus-within:ring-2 focus-within:ring-green-400">
          <span className="text-3xl text-green-400 mb-2">🛠️</span>
          <span className="font-bold text-blue-800 text-base mb-1">관리자 기능</span>
          <span className="text-gray-700 text-sm text-center leading-snug">시설 등록/수정/삭제, 예약 승인 등</span>
        </li>
      </ul>
      <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
        <a href="/facilities" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-center min-h-[48px]">시설 둘러보기</a>
        <a href="/login" className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-green-500 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 text-center min-h-[48px]">로그인/회원가입</a>
      </div>
      <div className="mt-8 w-full bg-gradient-to-r from-blue-100 to-green-100 border border-blue-100 rounded-xl p-4 text-center text-blue-700 font-semibold text-base shadow-sm">
        지금 회원가입하고, 우리 동네 공공시설을 스마트하게 이용해보세요!
      </div>
    </div>
  </section>
);

export default Home;
