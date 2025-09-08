import React from 'react';

const Notice = () => (
  <section className="w-full min-h-[60vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
    <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8" role="main" aria-label="공지사항">
      <header className="w-full flex flex-col items-center mb-2">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">공지사항</span>
        </h2>
      </header>
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <span className="inline-block mt-1 text-blue-400 text-2xl">📢</span>
          <div>
            <div className="font-bold text-blue-800 mb-1 text-lg">공공시설 예약 시스템이 오픈되었습니다.</div>
            <div className="text-gray-700 text-base">이용해주셔서 감사합니다.</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <span className="inline-block mt-1 text-blue-400 text-2xl">❓</span>
          <div>
            <div className="font-bold text-blue-800 mb-1 text-lg">예약 관련 문의</div>
            <div className="text-gray-700 text-base">문의는 <a href="/contact" className="text-blue-500 underline">문의 페이지</a>를 이용해 주세요.</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <span className="inline-block mt-1 text-blue-400 text-2xl">🛠️</span>
          <div>
            <div className="font-bold text-blue-800 mb-1 text-lg">시스템 점검 안내</div>
            <div className="text-gray-700 text-base">매주 일요일 02:00~03:00 시스템 점검이 진행됩니다.</div>
          </div>
        </div>
        {/* 관리자용 공지 등록/수정 영역(추후 구현) */}
      </div>
    </div>
  </section>
);

export default Notice;
