
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner, MessageBanner } from '../components/Feedback';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

type Facility = {
  id: string;
  name: string;
  address: string;
  description?: string;
  imageUrl?: string;
};

const Facilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'facilities'));
        setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Facility)));
        if (snapshot.empty) {
          setMessage('등록된 시설이 없습니다.');
          setMessageType('error');
        }
      } catch {
        setMessage('시설 목록을 불러오는 중 오류가 발생했습니다.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  if (loading) return <LoadingSpinner text="시설 목록을 불러오는 중..." />;

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
      <div className="w-full max-w-6xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-8">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">시설 목록</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center font-medium">공공시설을 한눈에 확인하고 예약해보세요.</p>
        </header>
        {message && messageType && (
          <MessageBanner type={messageType} message={message} onClose={() => { setMessage(''); setMessageType(''); }} />
        )}
        {facilities.length === 0 && !loading ? null : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {facilities.map(facility => (
              <div
                key={facility.id}
                className="rounded-2xl bg-white border border-blue-100 shadow-md flex flex-col overflow-hidden hover:shadow-xl transition relative focus-within:ring-4 focus-within:ring-blue-400 cursor-pointer min-h-[120px] select-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500 group"
                tabIndex={0}
                role="button"
                aria-label={facility.name + ' 상세 보기'}
                aria-pressed="false"
                onClick={() => navigate(`/facility/${facility.id}`)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/facility/${facility.id}`); }}
                style={{ touchAction: 'manipulation' }}
              >
                {facility.imageUrl ? (
                  <img
                    src={facility.imageUrl.startsWith('http') ? facility.imageUrl : `/images/${facility.imageUrl}`}
                    alt={facility.name}
                    className="w-full h-36 sm:h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-36 sm:h-40 md:h-44 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center text-blue-300 text-base">이미지 없음</div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-base sm:text-lg text-blue-800 mb-1 break-keep">{facility.name}</div>
                  <div className="text-sm sm:text-base text-gray-600 mb-1 break-keep">{facility.address}</div>
                  {facility.description && <div className="text-sm sm:text-base mb-2 text-gray-700 break-keep">{facility.description}</div>}
                  {/* 향후 상세/예약 버튼 등 추가 시 아래 버튼 스타일 사용 */}
                  {/*
                  <button
                    className="mt-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-base sm:text-lg shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[44px]"
                  >예약하기</button>
                  */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Facilities;
