
import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/Feedback';
import { Toast } from '../components/Toast';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';

const Reservation = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [facilityId, setFacilityId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'facilities'));
        setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        if (snapshot.empty) {
          setToast({ type: 'error', message: '등록된 시설이 없습니다. 관리자에게 문의하세요.' });
        }
      } catch {
        setToast({ type: 'error', message: '시설 정보를 불러오는 중 오류가 발생했습니다.' });
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setToast(null);
    if (!user) {
  setToast({ type: 'error', message: '로그인 후 예약이 가능합니다.' });
      return;
    }
    if (!facilityId || !date || !time) {
  setToast({ type: 'error', message: '모든 항목을 입력해 주세요.' });
      return;
    }
    try {
      // 예약 중복 체크
      const q = query(
        collection(db, "reservations"),
        where("facilityId", "==", facilityId),
        where("date", "==", date),
        where("time", "==", time)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
  setToast({ type: 'error', message: '이미 해당 시설의 해당 시간에 예약이 존재합니다. 다른 시간/시설을 선택해 주세요.' });
        return;
      }
      const facility = facilities.find((f) => f.id === facilityId);
      await addDoc(collection(db, "reservations"), {
        facilityId,
        facilityName: facility?.name || "",
        userId: user.uid,
        userEmail: user.email,
        date,
        time,
        createdAt: new Date(),
      });
  setToast({ type: 'success', message: '예약이 완료되었습니다!' });
      setFacilityId("");
      setDate("");
      setTime("");
    } catch {
  setToast({ type: 'error', message: '예약 중 오류가 발생했습니다.' });
    }
  };

  if (loading) return <LoadingSpinner text="시설 정보를 불러오는 중..." />;

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-lg bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">시설 예약</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center font-medium">예약을 원하는 시설, 날짜, 시간을 선택해 예약 신청을 완료하세요.</p>
        </header>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
        {facilities.length === 0 && !loading ? (
          <div className="text-center text-gray-500">시설이 없습니다.</div>
        ) : null}
        <form className="flex flex-col gap-5 bg-blue-50 p-4 sm:p-6 rounded-xl shadow-inner" onSubmit={handleSubmit} aria-label="시설 예약 폼" role="form">
          <label htmlFor="facility-select" className="sr-only">시설 선택</label>
          <select
            id="facility-select"
            className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
            value={facilityId}
            onChange={e => setFacilityId(e.target.value)}
            required
            aria-label="시설 선택"
            aria-required="true"
            aria-invalid={!facilityId ? 'true' : 'false'}
          >
            <option value="">시설 선택</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <label htmlFor="date-input" className="sr-only">예약 날짜</label>
          <input
            id="date-input"
            type="date"
            className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            aria-label="예약 날짜"
            aria-required="true"
            aria-invalid={!date ? 'true' : 'false'}
          />
          <label htmlFor="time-input" className="sr-only">예약 시간</label>
          <input
            id="time-input"
            type="time"
            className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
            aria-label="예약 시간"
            aria-required="true"
            aria-invalid={!time ? 'true' : 'false'}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[44px] px-6"
            aria-label="예약 신청"
          >
            예약 신청
          </button>
        </form>
        <div className="mt-6 text-gray-600 text-sm text-center">※ 예약 내역은 마이페이지에서 확인할 수 있습니다.</div>
      </div>
    </section>
  );
};

export default Reservation;
