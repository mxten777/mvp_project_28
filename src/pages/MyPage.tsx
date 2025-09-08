import React, { useEffect, useState } from 'react';
import { Toast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';

const MyPage = () => {
  const user = auth.currentUser;
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const navigate = useNavigate();
  const fetchReservations = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, 'reservations'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc'),
        orderBy('time', 'desc')
      );
      const snapshot = await getDocs(q);
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      if (snapshot.empty) {
        setToast({ type: 'info', message: '예약 내역이 없습니다.' });
      }
    } catch {
      setToast({ type: 'error', message: '예약 내역을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line
  }, [user]);

  const handleCancel = async (reservationId: string) => {
    if (!window.confirm('정말로 이 예약을 취소하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'reservations', reservationId));
      setToast({ type: 'success', message: '예약이 취소되었습니다.' });
      setReservations(reservations.filter(r => r.id !== reservationId));
    } catch {
      setToast({ type: 'error', message: '예약 취소 중 오류가 발생했습니다.' });
    }
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">마이페이지</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center font-medium">내 예약 내역을 확인하고 관리하세요.</p>
        </header>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
        {!user ? (
          <div className="bg-blue-50 p-4 rounded-xl text-center text-gray-600">
            <span className="font-semibold">로그인 후 예약 내역을 확인할 수 있습니다.</span>
          </div>
        ) : loading ? (
          <div className="text-center text-gray-500">예약 내역을 불러오는 중...</div>
        ) : reservations.length === 0 ? (
          <div className="bg-blue-50 p-4 rounded-xl text-center text-gray-600">
            <span className="font-semibold">예약 내역이 없습니다.</span>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map(rsv => (
              <div
                key={rsv.id}
                className="rounded-2xl bg-white border border-blue-100 shadow-md flex flex-col overflow-hidden hover:shadow-xl transition relative focus-within:ring-4 focus-within:ring-blue-400 min-h-[110px] select-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500 p-4 sm:p-6 cursor-pointer group"
                tabIndex={0}
                role="button"
                aria-label={rsv.facilityName + ' 예약 상세 보기'}
                aria-pressed="false"
                onClick={() => navigate(`/reservation-detail/${rsv.id}`)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/reservation-detail/${rsv.id}`); }}
                style={{ touchAction: 'manipulation' }}
              >
                <div className="font-bold text-base sm:text-lg text-blue-700 mb-1 break-keep group-hover:text-blue-900 transition">{rsv.facilityName || '시설명 없음'}</div>
                <div className="text-sm sm:text-base text-gray-700">날짜: <span className="font-semibold">{rsv.date}</span></div>
                <div className="text-sm sm:text-base text-gray-700">시간: <span className="font-semibold">{rsv.time}</span></div>
                <div className="text-gray-500 text-xs sm:text-sm mt-1">예약일: {rsv.createdAt && rsv.createdAt.toDate ? rsv.createdAt.toDate().toLocaleString() : ''}</div>
                <button
                  className="mt-3 bg-gradient-to-r from-red-400 to-red-500 text-white py-2 px-4 rounded-xl font-bold text-base shadow hover:from-red-500 hover:to-red-600 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 min-h-[40px]"
                  onClick={e => { e.stopPropagation(); handleCancel(rsv.id); }}
                  onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter' || e.key === ' ') handleCancel(rsv.id); }}
                  aria-label="예약 취소"
                  type="button"
                >
                  예약 취소
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPage;
