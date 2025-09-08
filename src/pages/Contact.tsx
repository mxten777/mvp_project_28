import React, { useState } from 'react';
import { Toast } from '../components/Toast';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setToast({ type: 'success', message: '문의가 접수되었습니다. 빠른 시일 내 답변드리겠습니다.' });
  };

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8" role="main" aria-label="문의하기">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">문의하기</span>
          </h2>
        </header>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
        {sent ? (
          <div className="text-green-700 font-bold text-center text-lg">문의가 접수되었습니다.<br />빠른 시일 내 답변드리겠습니다.</div>
        ) : (
          <form className="flex flex-col gap-5 bg-blue-50 p-4 sm:p-6 rounded-xl shadow-inner" onSubmit={handleSubmit} aria-label="문의 폼" role="form">
            <input
              type="email"
              className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
              placeholder="이메일(답변받을 주소)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="이메일"
            />
            <textarea
              className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base min-h-[100px]"
              placeholder="문의 내용을 입력해 주세요."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              aria-label="문의 내용"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[44px] px-6">
              문의 보내기
            </button>
          </form>
        )}
        {/* 관리자용 문의 답변/목록 영역(추후 구현) */}
      </div>
    </section>
  );
};

export default Contact;
