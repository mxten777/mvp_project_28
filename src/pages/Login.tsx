import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      let msg = '회원가입 중 오류가 발생했습니다.';
      if (err.code === 'auth/email-already-in-use') {
        msg = '이미 가입된 이메일입니다. 로그인해 주세요.';
      } else if (err.code === 'auth/invalid-email') {
        msg = '이메일 형식이 올바르지 않습니다.';
      } else if (err.code === 'auth/weak-password') {
        msg = '비밀번호는 6자 이상이어야 합니다.';
      } else if (err.code === 'auth/user-not-found') {
        msg = '존재하지 않는 계정입니다.';
      } else if (err.code === 'auth/wrong-password') {
        msg = '비밀번호가 올바르지 않습니다.';
      }
      setError(msg);
    }
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-2 py-8 sm:py-16">
      <div className="w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2 text-center drop-shadow-lg tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">{isRegister ? '회원가입' : '로그인'}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center font-medium">
            {isRegister
              ? '공공시설 예약 및 다양한 서비스를 이용하려면 회원가입이 필요합니다.'
              : '로그인 후 시설 예약, 내역 확인 등 모든 서비스를 이용할 수 있습니다.'}
          </p>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-blue-50 p-4 sm:p-6 rounded-xl shadow-inner" aria-label={isRegister ? '회원가입 폼' : '로그인 폼'} role="form" autoComplete="off">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
            required
            aria-label="이메일"
            aria-required="true"
            aria-invalid={!email ? 'true' : 'false'}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
            required
            aria-label="비밀번호"
            aria-required="true"
            aria-invalid={!password ? 'true' : 'false'}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[44px] px-6">
            {isRegister ? '회원가입' : '로그인'}
          </button>
        </form>
        <div className="mt-2 text-center">
          <button
            className="text-blue-500 underline text-sm hover:text-blue-700 transition"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
