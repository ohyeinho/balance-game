export interface Question {
  id: number;
  optionA: string;
  optionB: string;
}

export const questions: Question[] = [
  {
    id: 1,
    optionA: "하고 싶은 일만 하면서 연봉 3000",
    optionB: "영혼을 갈아넣고 연봉 1억",
  },
  {
    id: 2,
    optionA: "재택근무인데 상사가 30분마다 카톡 확인",
    optionB: "출근인데 자유롭게 일하고 칼퇴 보장",
  },
  {
    id: 3,
    optionA: "연봉 500 올려주는 대신 점심시간 30분",
    optionB: "연봉 동결인데 점심시간 2시간",
  },
  {
    id: 4,
    optionA: "능력은 없지만 인간적으로 좋은 상사",
    optionB: "능력은 최고인데 매일 소리지르는 상사",
  },
  {
    id: 5,
    optionA: "회사 바로 옆에 살기 (출퇴근 5분)",
    optionB: "출퇴근 1시간 반이지만 꿈의 동네에 살기",
  },
  {
    id: 6,
    optionA: "매일 회식 참석 필수 (술값 회사 지원)",
    optionB: "회식 영원히 없음 (팀 단합 제로)",
  },
  {
    id: 7,
    optionA: "월급은 통장을 스치지만 복지 끝판왕",
    optionB: "복지 제로인데 월급이 200만원 더 많음",
  },
  {
    id: 8,
    optionA: "평생 주니어 직급이지만 칼퇴 보장",
    optionB: "3년 안에 임원 승진이지만 매일 야근",
  },
  {
    id: 9,
    optionA: "사수가 모든 걸 알려주지만 잔소리 10배",
    optionB: "사수 없이 맨땅에 헤딩이지만 완전한 자유",
  },
  {
    id: 10,
    optionA: "회사에서 내 존재감 제로 (투명인간)",
    optionB: "모든 회의에 불려다니는 핵심 인재 (회의만 하루 5시간)",
  },
];
