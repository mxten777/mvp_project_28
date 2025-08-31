# 공공시설 예약 통합 웹앱 프로젝트 정리

## 1. 프로젝트 개요
- **목적**: 지자체 및 공공기관의 시설(강당, 체육관, 회의실 등) 예약을 온라인으로 통합 관리/운영할 수 있는 웹앱 MVP 개발
- **주요 사용자**: 일반 시민(예약자), 관리자(시설 등록/관리)
- **핵심 기능**
  - 시설 목록 조회 및 상세 정보 확인
  - 회원가입/로그인(이메일 기반)
  - 시설 예약(날짜/시간 선택, Firestore 저장)
  - 마이페이지에서 내 예약 내역 확인
  - 관리자 페이지에서 시설 등록/수정/삭제

---

## 2. 기술 스택
- **Frontend**: Vite + React + TypeScript + TailwindCSS
- **Backend/DB**: Firebase (Authentication, Firestore)
- **Routing**: React Router
- **배포(예정)**: Vercel
- **기타**: n8n/Zapier(자동화, 추후 도입)

---

## 3. 현재 구현된 주요 기능
- 프로젝트 환경 구축 및 기본 구조 세팅
- TailwindCSS 적용 및 반응형/모던 UI 구현
- Firebase 연동 (Auth, Firestore)
- 회원가입/로그인/로그아웃
- 시설 목록 조회(실시간 Firestore 연동)
- 관리자 페이지: 시설 등록/수정/삭제, 샘플 데이터 등록
- 예약 페이지: 시설/날짜/시간 선택 → Firestore에 예약 저장, 로그인 체크, 성공/실패 메시지
- 마이페이지: 로그인한 사용자의 예약 내역 Firestore에서 불러와 표시

---

## 4. 폴더/파일 구조 (주요 파일)
```
src/
  pages/
    Home.tsx         // 서비스 소개, 메인
    Facilities.tsx   // 시설 목록
    Reservation.tsx  // 예약 신청
    MyPage.tsx       // 내 예약 내역
    Admin.tsx        // 관리자 시설 관리
    Login.tsx        // 로그인/회원가입
  firebase/
    firebaseConfig.ts // Firebase 설정
    index.ts          // Firebase 인스턴스 export
  App.tsx            // 라우팅, 네비게이션
  index.css          // TailwindCSS 적용
```

---

## 5. Firestore 데이터 구조 예시

- **facilities** (시설)
  - id, name, address, description, imageUrl

- **reservations** (예약)
  - id, facilityId, facilityName, userId, userEmail, date, time, createdAt

---

## 6. 앞으로 해야 할 일 (To-Do)

### MVP 마무리
- [ ] 예약 중복 방지(동일 시설/날짜/시간 중복 예약 체크)
- [ ] 예약 취소 기능(마이페이지에서)
- [ ] 관리자: 예약 현황/통계 조회(간단 리스트)
- [ ] 접근 권한 강화(관리자/일반 사용자 구분, Firestore rules 보완)
- [ ] UI/UX 마무리(로딩, 에러, 안내 메시지 등 디테일)
- [ ] 반응형/접근성 점검

### 추가/고도화(선택)
- [ ] 이메일 인증/비밀번호 재설정
- [ ] 예약 승인/거절(관리자)
- [ ] 예약 내역 엑셀 다운로드(관리자)
- [ ] 공지사항/FAQ 페이지
- [ ] 다국어 지원(영문 등)
- [ ] 자동화(n8n/Zapier) 연동
- [ ] Vercel 등으로 배포 및 도메인 연결

---

## 7. 기타 참고
- Firestore 보안 규칙은 개발 중이므로, 배포 전 반드시 강화 필요
- 샘플 데이터는 powershell/node 스크립트로 등록 가능
- TailwindCSS는 index.css에 정상 적용됨

---

필요한 세부 구현 가이드, 코드 예시, 추가 기획 등 요청하시면 바로 도와드릴 수 있습니다!
