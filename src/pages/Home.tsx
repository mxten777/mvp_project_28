import React from 'react';

const Home = () => (
  <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
    <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center drop-shadow">공공시설 예약 통합 플랫폼</h1>
    <p className="text-lg text-gray-700 mb-6 text-center">시군구 주민 누구나 쉽고 빠르게 공공시설을 예약하고, 다양한 복지·공유 서비스를 누릴 수 있는 올인원 웹앱입니다.</p>
    <ul className="mb-6 space-y-2 text-base text-gray-800">
      <li>✔️ <b>시설 예약</b>: 회의실, 체육관, 강당 등 다양한 공공시설을 한 곳에서 예약</li>
      <li>✔️ <b>실시간 현황</b>: 예약 가능 시간, 위치, 상세정보 즉시 확인</li>
      <li>✔️ <b>내 예약 관리</b>: 마이페이지에서 예약 내역·취소·변경</li>
      <li>✔️ <b>관리자 기능</b>: 시설 등록/수정/삭제, 예약 승인 등</li>
    </ul>
    <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center text-blue-700 font-semibold">
      지금 회원가입하고, 우리 동네 공공시설을 스마트하게 이용해보세요!
    </div>
  </div>
);

export default Home;
