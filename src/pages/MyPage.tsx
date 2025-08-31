import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const MyPage = () => {
  const user = auth.currentUser;
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, 'reservations'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc'),
        orderBy('time', 'desc')
      );
      const snapshot = await getDocs(q);
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchReservations();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">마이페이지</h2>
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
        <div className="space-y-4">
          {reservations.map(rsv => (
            <div key={rsv.id} className="bg-blue-50 p-4 rounded-xl shadow border border-blue-100">
              <div className="font-bold text-blue-700 text-lg mb-1">{rsv.facilityName || '시설명 없음'}</div>
              <div className="text-gray-700">날짜: <span className="font-semibold">{rsv.date}</span></div>
              <div className="text-gray-700">시간: <span className="font-semibold">{rsv.time}</span></div>
              <div className="text-gray-500 text-sm mt-1">예약일: {rsv.createdAt && rsv.createdAt.toDate ? rsv.createdAt.toDate().toLocaleString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
