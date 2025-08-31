
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchFacilities = async () => {
      const snapshot = await getDocs(collection(db, 'facilities'));
      setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Facility)));
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  if (loading) return <div className="text-center mt-10 text-blue-600 font-bold">로딩 중...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow">시설 목록</h2>
      {facilities.length === 0 ? (
        <div className="text-center text-gray-500">등록된 시설이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {facilities.map(facility => (
            <div key={facility.id} className="rounded-2xl bg-white border border-blue-100 shadow-md flex flex-col overflow-hidden hover:shadow-lg transition relative">
              {facility.imageUrl ? (
                <img
                  src={facility.imageUrl.startsWith('http') ? facility.imageUrl : `/images/${facility.imageUrl}`}
                  alt={facility.name}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <div className="w-full h-36 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center text-blue-300 text-base">이미지 없음</div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-bold text-lg text-blue-800 mb-1">{facility.name}</div>
                <div className="text-sm text-gray-600 mb-1">{facility.address}</div>
                {facility.description && <div className="text-sm mb-2 text-gray-700">{facility.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Facilities;
