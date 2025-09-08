import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { LoadingSpinner } from '../components/Feedback';
import { Toast } from '../components/Toast';

const ReservationDetail = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      if (!id) {
        setToast({ type: 'error', message: '잘못된 접근입니다.' });
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, 'reservations', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setReservation({ id: snap.id, ...snap.data() });
        } else {
          setToast({ type: 'error', message: '예약 정보를 찾을 수 없습니다.' });
        }
      } catch (e) {
        setToast({ type: 'error', message: '예약 정보를 불러오는 중 오류가 발생했습니다.' });
      }
      setLoading(false);
    };
    fetchReservation();
  }, [id]);


  if (loading) return <LoadingSpinner text="예약 정보를 불러오는 중..." />;
  if (toast) return <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />;
  if (!reservation) return null;

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-6" role="main" aria-label="예약 상세 정보">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/mypage" className="text-blue-500 hover:text-green-500 hover:underline text-sm font-semibold transition" aria-label="내 예약 내역으로">← 내 예약 내역</Link>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg tracking-tight text-center">예약 상세</h2>
        <div className="flex flex-col gap-2 mb-2">
          <div className="text-lg text-gray-700"><span className="font-bold text-blue-700">시설명:</span> {reservation.facilityName}</div>
          <div className="text-base text-gray-700"><span className="font-bold text-blue-700">예약일:</span> {reservation.date}</div>
          <div className="text-base text-gray-700"><span className="font-bold text-blue-700">예약시간:</span> {reservation.time}</div>
          <div className="text-base text-gray-700"><span className="font-bold text-blue-700">예약자:</span> {reservation.userEmail}</div>
        </div>
        {/* 시설 상세 이동 버튼 */}
        <Link
          to={`/facility/${reservation.facilityId}`}
          className="block w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-500 active:scale-95 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-center mt-2 mb-2"
          aria-label="시설 상세 보기"
        >
          <span className="inline-flex items-center gap-2 justify-center"><span className="text-xl">🏛️</span> 시설 상세 보기</span>
        </Link>
        {/* 예약 취소 버튼(추후 기능 연동) */}
        <button
          className="block w-full bg-gradient-to-r from-red-400 to-red-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-red-500 hover:to-red-600 active:scale-95 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 text-center"
          aria-label="예약 취소"
          disabled
        >
          <span className="inline-flex items-center gap-2 justify-center"><span className="text-xl">❌</span> 예약 취소 (추후 구현)</span>
        </button>
      </div>
    </section>
  );
};

export default ReservationDetail;
