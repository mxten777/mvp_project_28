// public/images 폴더의 이미지 파일명을 기반으로 Firestore에 시설 샘플 데이터를 자동 등록하는 Node.js 스크립트
// 사용법: node scripts/registerSampleFacilities.js

const fs = require('fs');
const path = require('path');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Firebase Admin SDK 초기화 (serviceAccountKey.json 필요)
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

const imagesDir = path.join(__dirname, '../public/images');

// 이미지 파일명 배열 가져오기
const imageFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

// 샘플 시설명/주소/설명 (이미지 수에 맞게 반복)
const sampleNames = [
  '시청 대강당',
  '구민 체육관',
  '동주민센터 회의실',
  '공공도서관 세미나실',
  '청소년 문화의집',
  '노인복지관',
  '주민자치센터',
  '청소년 수련관',
  '문화예술회관',
  '체험학습장'
];
const sampleAddresses = [
  '서울시청 1층',
  '서울구로구 구로동 123',
  '서울강남구 역삼동 456',
  '서울서초구 서초동 789',
  '서울마포구 합정동 101',
  '서울동작구 상도동 222',
  '서울성동구 성수동 333',
  '서울강서구 화곡동 444',
  '서울송파구 잠실동 555',
  '서울용산구 이태원동 666'
];
const sampleDescs = [
  '대규모 회의 및 행사 가능',
  '실내 체육시설',
  '소규모 모임/회의',
  '세미나 및 강연',
  '청소년 전용 문화공간',
  '노인 복지 서비스',
  '주민 커뮤니티 공간',
  '청소년 활동 지원',
  '문화예술 공연/전시',
  '체험 및 교육 프로그램'
];

async function main() {
  for (let i = 0; i < imageFiles.length && i < sampleNames.length; i++) {
    const doc = {
      name: sampleNames[i],
      address: sampleAddresses[i],
      description: sampleDescs[i],
      imageUrl: imageFiles[i],
    };
    await db.collection('facilities').add(doc);
    console.log('등록:', doc);
  }
  console.log('샘플 시설 등록 완료!');
}

main();
