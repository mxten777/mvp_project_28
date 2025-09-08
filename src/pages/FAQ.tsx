import React from 'react';

const FAQ = () => (
  <section className="w-full min-h-[60vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
    <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8" role="main" aria-label="자주 묻는 질문">
      <header className="w-full flex flex-col items-center mb-2">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">자주 묻는 질문(FAQ)</span>
        </h2>
      </header>
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm flex flex-col gap-1">
          <div className="font-bold text-blue-800 mb-1 flex items-center gap-2 text-lg"><span className="text-2xl">❓</span>예약은 어떻게 하나요?</div>
          <div className="text-gray-700 text-base pl-8">시설목록에서 원하는 시설을 선택 후, 예약 페이지에서 날짜와 시간을 지정해 신청하실 수 있습니다.</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm flex flex-col gap-1">
          <div className="font-bold text-blue-800 mb-1 flex items-center gap-2 text-lg"><span className="text-2xl">❓</span>예약 취소는 어디서 하나요?</div>
          <div className="text-gray-700 text-base pl-8">마이페이지에서 예약 내역을 확인하고, 취소 버튼을 통해 예약을 취소할 수 있습니다.</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm flex flex-col gap-1">
          <div className="font-bold text-blue-800 mb-1 flex items-center gap-2 text-lg"><span className="text-2xl">❓</span>관리자 권한은 어떻게 받나요?</div>
          <div className="text-gray-700 text-base pl-8">관리자 권한은 기관 담당자에게 별도 문의해 주세요.</div>
        </div>
        {/* 관리자용 FAQ 등록/수정 영역(추후 구현) */}
      </div>
    </div>
  </section>
);

export default FAQ;
