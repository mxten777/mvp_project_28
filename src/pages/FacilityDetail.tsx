import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { LoadingSpinner } from '../components/Feedback';
import { Toast } from '../components/Toast';

const FacilityDetail = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    const fetchFacility = async () => {
      if (!id) return;
      try {
        const ref = doc(db, 'facilities', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFacility({ id: snap.id, ...snap.data() });
        } else {
          setToast({ type: 'error', message: '시설 정보를 찾을 수 없습니다.' });
        }
      } catch {
  setToast({ type: 'error', message: '시설 정보를 불러오는 중 오류가 발생했습니다.' });
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [id]);

  if (loading) return <LoadingSpinner text="시설 정보를 불러오는 중..." />;
  if (toast) return <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />;
  if (!facility) return null;

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-6" role="main" aria-label="시설 상세 정보">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/facilities" className="text-blue-500 hover:text-green-500 hover:underline text-sm font-semibold transition" aria-label="시설 목록으로">← 시설 목록</Link>
        </div>
  <h2 className="text-xl sm:text-2xl font-extrabold text-blue-700 mb-2 drop-shadow tracking-tight text-center">{facility.name}</h2>
        {facility.imageUrl && (
          <img src={facility.imageUrl.startsWith('http') ? facility.imageUrl : `/images/${facility.imageUrl}`} alt={facility.name} className="w-full h-52 object-cover rounded-2xl mb-2 border shadow-sm" />
        )}
        <div className="flex flex-col gap-2 mb-2">
          <div className="text-lg text-gray-700"><span className="font-bold text-blue-700">주소:</span> {facility.address}</div>
          {facility.description && <div className="text-base text-gray-700"><span className="font-bold text-blue-700">설명:</span> {facility.description}</div>}
        </div>
        {/* 지도(임시) */}
        <div className="mb-2">
          <div className="w-full h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl flex items-center justify-center text-blue-400 text-sm font-semibold shadow-inner">지도 영역(추후 연동)</div>
        </div>
        {/* 예약 현황(임시) */}
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 font-bold rounded-full px-4 py-1 text-sm shadow">예약 현황: <span className="font-extrabold">추후 구현</span></span>
        </div>
        {/* 예약 버튼 */}
        <Link
          to="/reservation"
          className="block w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-500 active:scale-95 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-center mt-2"
          aria-label="이 시설 예약하기"
        >
          <span className="inline-flex items-center gap-2 justify-center"><span className="text-xl">📝</span> 이 시설 예약하기</span>
        </Link>
      </div>
    </section>
  );
};

export default FacilityDetail;
