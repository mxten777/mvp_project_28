import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { LoadingSpinner } from '../components/Feedback';
import { Toast } from '../components/Toast';

const ADMIN_EMAILS = [
  'admin@example.com', // 실제 관리자 이메일로 교체
  // 여러 명이면 추가
];

const Admin = () => {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  // 예약 현황/통계용 상태
  const [reservations, setReservations] = useState<any[]>([]);
  const [resvLoading, setResvLoading] = useState(true);

  // 시설 목록 불러오기
  const fetchFacilities = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, 'facilities'));
    setFacilities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchFacilities();
    const fetchReservations = async () => {
      setResvLoading(true);
      const q = query(collection(db, 'reservations'), orderBy('date', 'desc'), orderBy('time', 'desc'));
      const snapshot = await getDocs(q);
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setResvLoading(false);
    };
    fetchReservations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setToast(null);
    try {
      if (editId) {
        // 수정
        await updateDoc(doc(db, 'facilities', editId), {
          name,
          address,
          description,
          imageUrl
        });
  setToast({ type: 'success', message: '✅ 시설 정보가 수정되었습니다!' });
      } else {
        // 신규 등록
        await addDoc(collection(db, 'facilities'), {
          name,
          address,
          description,
          imageUrl
        });
  setToast({ type: 'success', message: '✅ 시설이 성공적으로 등록되었습니다!' });
      }
      setName('');
      setAddress('');
      setDescription('');
      setImageUrl('');
      setEditId(null);
      fetchFacilities();
    } catch (err) {
  setToast({ type: 'error', message: editId ? '수정 중 오류가 발생했습니다.' : '등록 중 오류가 발생했습니다.' });
    }
  };

  // 샘플 데이터 등록 함수
  const handleSample = async () => {
  setToast(null);
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
  setToast({ type: 'success', message: '✅ 샘플 시설 5개가 등록되었습니다!' });
      fetchFacilities();
    } catch (err) {
  setToast({ type: 'error', message: '샘플 데이터 등록 중 오류가 발생했습니다.' });
    }
  };

  // 관리자 인증 체크
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    return (
      <>
        <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-red-200 text-center">
          <div className="text-red-600 font-bold text-lg">접근 권한 없음: 관리자만 접근 가능한 페이지입니다.</div>
        </div>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </>
    );
  }

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-start px-2 py-8 sm:py-12">
  <div className="w-full max-w-5xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-10 flex flex-col gap-10">
        <header className="w-full flex flex-col items-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">관리자 시설 관리</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center font-medium">시설 등록, 수정, 삭제 및 예약 현황/통계를 한눈에 관리하세요.</p>
        </header>
        <button onClick={handleSample} type="button" className="mb-2 w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-green-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400">
          샘플 시설 5개 등록
        </button>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}

        {/* 예약 현황/통계 섹션 */}
        <section className="w-full bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-2xl p-4 sm:p-8 shadow-inner mb-2">
          <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2"><span>📊</span>예약 현황/통계</h3>
          {resvLoading ? (
            <LoadingSpinner text="예약 데이터를 불러오는 중..." />
          ) : reservations.length === 0 ? (
            <div className="text-center text-gray-500 font-semibold">예약 내역이 없습니다.</div>
          ) : (
            <>
              {/* 시설별 예약 건수 통계 */}
              <div className="mb-8">
                <h4 className="font-semibold text-blue-600 mb-3">시설별 예약 건수</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {facilities.map(facility => {
                    const count = reservations.filter(r => r.facilityId === facility.id).length;
                    return (
                      <div key={facility.id} className="bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-xl p-3 text-center min-h-[60px] flex flex-col items-center justify-center shadow-sm">
                        <div className="font-bold text-base sm:text-lg text-blue-800 break-keep mb-1">{facility.name}</div>
                        <div className="text-lg sm:text-xl font-extrabold text-blue-600">{count}건</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 예약 전체 리스트 테이블 */}
              <div className="overflow-x-auto rounded-xl border border-blue-200 bg-white shadow">
                <table className="min-w-full text-sm">
                  <thead className="bg-gradient-to-r from-blue-100 to-green-100">
                    <tr>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">시설명</th>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">예약자</th>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">이메일</th>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">날짜</th>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">시간</th>
                      <th className="px-3 py-2 border-b font-bold text-blue-700">예약일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id} className="even:bg-blue-50 hover:bg-blue-100 transition">
                        <td className="px-3 py-2 border-b text-blue-900 font-semibold">{r.facilityName || r.facilityId}</td>
                        <td className="px-3 py-2 border-b">{r.userId}</td>
                        <td className="px-3 py-2 border-b">{r.userEmail}</td>
                        <td className="px-3 py-2 border-b">{r.date}</td>
                        <td className="px-3 py-2 border-b">{r.time}</td>
                        <td className="px-3 py-2 border-b">{r.createdAt && r.createdAt.toDate ? r.createdAt.toDate().toLocaleString() : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        {/* 시설 등록 폼 */}
  <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10 bg-blue-50 p-4 sm:p-6 rounded-xl shadow-inner" aria-label="시설 등록 폼" role="form" autoComplete="off">
        <label htmlFor="facility-name" className="sr-only">시설명</label>
        <input
          id="facility-name"
          type="text"
          placeholder="시설명"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
          required
          aria-label="시설명"
          aria-required="true"
          aria-invalid={!name ? 'true' : 'false'}
        />
        <label htmlFor="facility-address" className="sr-only">주소</label>
        <input
          id="facility-address"
          type="text"
          placeholder="주소"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
          required
          aria-label="주소"
          aria-required="true"
          aria-invalid={!address ? 'true' : 'false'}
        />
        <label htmlFor="facility-desc" className="sr-only">설명</label>
        <input
          id="facility-desc"
          type="text"
          placeholder="설명"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base"
          aria-label="설명"
        />
        <label htmlFor="facility-img" className="sr-only">이미지 URL</label>
        <div className="flex flex-col gap-2">
          <input
            id="facility-img"
            type="text"
            placeholder="이미지 URL (선택)"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className={`border-2 border-blue-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 text-base ${editId ? 'opacity-50' : ''}`}
            style={editId ? { backgroundColor: '#f8fafc' } : {}}
            readOnly={false}
            aria-label="이미지 URL"
          />
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            aria-label="이미지 파일 업로드"
            onChange={async e => {
              const file = e.target.files && e.target.files[0];
              if (!file) return;
              try {
                // @ts-ignore
                const destPath = `/images/${file.name}`;
                setImageUrl(file.name);
                const reader = new FileReader();
                reader.onload = ev => {
                  const img = document.getElementById('facility-img-preview');
                  if (img && ev.target) (img as HTMLImageElement).src = ev.target.result as string;
                };
                reader.readAsDataURL(file);
                alert('이미지 파일을 public/images 폴더에 직접 복사해 주세요. (파일명 자동 입력됨)');
              } catch {
                alert('이미지 업로드에 실패했습니다.');
              }
            }}
          />
          {imageUrl && (
            <img id="facility-img-preview" src={imageUrl.startsWith('http') ? imageUrl : `/images/${imageUrl}`} alt="미리보기" className="w-full h-32 object-cover rounded mt-2 border" />
          )}
        </div>
  <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-bold text-base shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[44px] px-6" aria-label="시설 등록">시설 등록</button>
      </form>

      {/* 시설 목록 */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-700">등록된 시설 목록</h3>
        {loading ? (
          <LoadingSpinner text="시설 목록을 불러오는 중..." />
        ) : facilities.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold">등록된 시설이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {facilities.map(facility => (
              <div
                key={facility.id}
                className="rounded-2xl bg-white border border-blue-100 shadow-md flex flex-col overflow-hidden hover:shadow-xl transition relative focus-within:ring-4 focus-within:ring-blue-400 min-h-[120px] select-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                tabIndex={0}
                role="button"
                aria-label={facility.name + ' 카드 상세/수정'}
                aria-pressed="false"
                style={{ touchAction: 'manipulation' }}
              >
                {facility.imageUrl ? (
                  <img src={facility.imageUrl && facility.imageUrl.startsWith('http') ? facility.imageUrl : `/images/${facility.imageUrl}`} alt={facility.name} className="w-full h-36 sm:h-40 md:h-44 object-cover" draggable={false} />
                ) : (
                  <div className="w-full h-36 sm:h-40 md:h-44 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center text-blue-300 text-base">이미지 없음</div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-base sm:text-lg text-blue-800 mb-1 break-keep">{facility.name}</div>
                  <div className="text-sm sm:text-base text-gray-600 mb-1 break-keep">{facility.address}</div>
                  {facility.description && <div className="text-sm sm:text-base mb-2 text-gray-700 break-keep">{facility.description}</div>}
                  <div className="flex flex-row gap-2 mt-auto items-center justify-end flex-wrap">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 px-4 rounded-xl font-bold text-base shadow hover:from-blue-600 hover:to-blue-500 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 min-h-[40px]"
                      aria-label={facility.name + ' 수정'}
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
                        className="bg-gray-100 text-gray-700 font-bold text-base rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-200 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 min-h-[40px]"
                        type="button"
                        aria-label={facility.name + ' 수정취소'}
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
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white py-2 px-4 rounded-xl font-bold text-base shadow hover:from-red-500 hover:to-red-600 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 min-h-[40px]"
                      aria-label={facility.name + ' 삭제'}
                      onClick={async () => {
                        if(window.confirm('정말 삭제하시겠습니까?')) {
                          try {
                            await import('firebase/firestore').then(({ deleteDoc, doc }) =>
                              deleteDoc(doc(db, 'facilities', facility.id))
                            );
                            setToast({ type: 'success', message: '시설이 삭제되었습니다.' });
                            fetchFacilities();
                          } catch {
                            setToast({ type: 'error', message: '삭제 중 오류가 발생했습니다.' });
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
    </section>
  );
};

export default Admin;