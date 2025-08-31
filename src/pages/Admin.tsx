import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  // 시설 목록 불러오기
  const fetchFacilities = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, 'facilities'));
    setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      if (editId) {
        // 수정
        await updateDoc(doc(db, 'facilities', editId), {
          name,
          address,
          description,
          imageUrl
        });
        setSuccess('✅ 시설 정보가 수정되었습니다!');
      } else {
        // 신규 등록
        await addDoc(collection(db, 'facilities'), {
          name,
          address,
          description,
          imageUrl
        });
        setSuccess('✅ 시설이 성공적으로 등록되었습니다!');
      }
      setName('');
      setAddress('');
      setDescription('');
      setImageUrl('');
      setEditId(null);
      fetchFacilities();
    } catch (err) {
      setError(editId ? '수정 중 오류가 발생했습니다.' : '등록 중 오류가 발생했습니다.');
    }
  };

  // 샘플 데이터 등록 함수
  const handleSample = async () => {
    setSuccess('');
    setError('');
    const data = [
      { name: '시청 대강당', address: '서울시청 1층', description: '대규모 회의 및 행사 가능', imageUrl: 'image-06.jpg' },
      { name: '구민 체육관', address: '서울구로구 구로동 123', description: '실내 체육시설', imageUrl: 'image-07.jpg' },
      { name: '동주민센터 회의실', address: '서울강남구 역삼동 456', description: '소규모 모임/회의', imageUrl: 'image-08.jpg' },
      { name: '공공도서관 세미나실', address: '서울서초구 서초동 789', description: '세미나 및 강연', imageUrl: 'image-09.jpg' },
      { name: '청소년 문화의집', address: '서울마포구 합정동 101', description: '청소년 전용 문화공간', imageUrl: 'image-10.jpg' }
    ];
    try {
      for (const f of data) {
        await addDoc(collection(db, 'facilities'), f);
      }
      setSuccess('✅ 샘플 시설 5개가 등록되었습니다!');
      fetchFacilities();
    } catch (err) {
      setError('샘플 데이터 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight drop-shadow">시설 등록</h2>
      <button onClick={handleSample} type="button" className="mb-6 w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-green-500 transition">샘플 시설 5개 등록</button>
      {success && <div className="text-green-700 text-lg font-bold mb-4 text-center bg-green-50 border border-green-200 rounded py-2">{success}</div>}
      {error && <div className="text-red-500 text-lg font-bold mb-4 text-center bg-red-50 border border-red-200 rounded py-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10 bg-blue-50 p-6 rounded-xl shadow-inner">
        <input
          type="text"
          placeholder="시설명"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg text-lg outline-none transition"
          required
        />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg text-lg outline-none transition"
          required
        />
        <input
          type="text"
          placeholder="설명"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg text-lg outline-none transition"
        />
        <input
          type="text"
          placeholder="이미지 URL (선택)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className={`border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg text-lg outline-none transition ${editId ? 'opacity-50' : ''}`}
          style={editId ? { backgroundColor: '#f8fafc' } : {}}
          readOnly={false}
        />
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-blue-500 transition">시설 등록</button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-700">등록된 시설 목록</h3>
        {loading ? (
          <div className="text-center text-gray-500">로딩 중...</div>
        ) : facilities.length === 0 ? (
          <div className="text-center text-gray-500">등록된 시설이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {facilities.map(facility => (
              <div key={facility.id} className="rounded-2xl bg-white border border-blue-100 shadow-md flex flex-col overflow-hidden hover:shadow-lg transition relative">
                {facility.imageUrl ? (
                  <img src={facility.imageUrl && facility.imageUrl.startsWith('http') ? facility.imageUrl : `/images/${facility.imageUrl}`} alt={facility.name} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center text-blue-300 text-base">이미지 없음</div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-lg text-blue-800 mb-1">{facility.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{facility.address}</div>
                  {facility.description && <div className="text-sm mb-2 text-gray-700">{facility.description}</div>}
                  <div className="flex flex-row gap-2 mt-auto items-center justify-end flex-wrap">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200 hover:bg-blue-100 transition"
                      onClick={() => {
                        setEditId(facility.id);
                        setName(facility.name);
                        setAddress(facility.address);
                        setDescription(facility.description || '');
                        setImageUrl(facility.imageUrl || '');
                      }}
                    >수정</button>
                    {editId === facility.id && (
                      <button
                        className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm border border-gray-300 hover:bg-gray-200 transition"
                        type="button"
                        onClick={() => {
                          setEditId(null);
                          setName('');
                          setAddress('');
                          setDescription('');
                          setImageUrl('');
                        }}
                      >수정취소</button>
                    )}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-50 text-red-600 font-semibold text-sm border border-red-200 hover:bg-red-100 transition"
                      onClick={async () => {
                        if(window.confirm('정말 삭제하시겠습니까?')) {
                          try {
                            await import('firebase/firestore').then(({ deleteDoc, doc }) =>
                              deleteDoc(doc(db, 'facilities', facility.id))
                            );
                            setSuccess('시설이 삭제되었습니다.');
                            fetchFacilities();
                          } catch {
                            setError('삭제 중 오류가 발생했습니다.');
                          }
                        }
                      }}
                    >삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
