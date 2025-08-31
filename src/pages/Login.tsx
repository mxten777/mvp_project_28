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
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-extrabold mb-4 text-center text-blue-700 drop-shadow">{isRegister ? '회원가입' : '로그인'}</h2>
      <div className="mb-4 text-gray-700 text-center text-base">
        {isRegister
          ? '공공시설 예약 및 다양한 서비스를 이용하려면 회원가입이 필요합니다.'
          : '로그인 후 시설 예약, 내역 확인 등 모든 서비스를 이용할 수 있습니다.'}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-blue-50 p-4 rounded-xl">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 p-2 rounded-lg text-base outline-none transition"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 p-2 rounded-lg text-base outline-none transition"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition">
          {isRegister ? '회원가입' : '로그인'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          className="text-blue-500 underline text-sm"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
        </button>
      </div>
    </div>
  );
};

export default Login;
