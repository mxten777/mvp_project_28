
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';

const Reservation = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [facilityId, setFacilityId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFacilities = async () => {
      const snapshot = await getDocs(collection(db, 'facilities'));
      setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!user) {
      setMessage('로그인 후 예약이 가능합니다.');
      return;
    }
    if (!facilityId || !date || !time) {
      setMessage('모든 항목을 입력해 주세요.');
      return;
    }
    try {
      const facility = facilities.find(f => f.id === facilityId);
      await addDoc(collection(db, 'reservations'), {
        facilityId,
        facilityName: facility?.name || '',
        userId: user.uid,
        userEmail: user.email,
        date,
        time,
        createdAt: new Date()
      });
      setMessage('✅ 예약이 완료되었습니다!');
      setFacilityId('');
      setDate('');
      setTime('');
    } catch {
      setMessage('예약 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">시설 예약</h2>
      <p className="mb-4 text-gray-700 text-center">예약을 원하는 시설, 날짜, 시간을 선택해 예약 신청을 완료하세요.</p>
      <form className="flex flex-col gap-4 bg-blue-50 p-4 rounded-xl" onSubmit={handleSubmit}>
        <select
          className="border-2 border-blue-200 rounded-lg p-2 text-base"
          value={facilityId}
          onChange={e => setFacilityId(e.target.value)}
          required
        >
          <option value="">시설 선택</option>
          {facilities.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <input
          type="date"
          className="border-2 border-blue-200 rounded-lg p-2 text-base"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="border-2 border-blue-200 rounded-lg p-2 text-base"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition">
          예약 신청
        </button>
      </form>
      {message && <div className="mt-4 text-center text-base font-semibold text-blue-700">{message}</div>}
      <div className="mt-6 text-gray-600 text-sm text-center">※ 예약 내역은 마이페이지에서 확인할 수 있습니다.</div>
    </div>
  );
};

export default Reservation;
