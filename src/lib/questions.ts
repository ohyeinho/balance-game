export interface Question {
  id: number;
  category: number;
  emoji: string;
  title: string;
  optionA: string;
  optionB: string;
}

export interface Category {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  startQuestion: number;
  endQuestion: number;
}

export const categories: Category[] = [
  {
    id: 1,
    title: "워밍업 - 취향편",
    subtitle: "간단한 취향 테스트",
    emoji: "🔥",
    description: "가볍게 몸풀기용 밸런스 게임입니다.",
    startQuestion: 1,
    endQuestion: 10,
  },
  {
    id: 2,
    title: "학창 시절편",
    subtitle: "그때 그 시절 우리의 모습",
    emoji: "🎒",
    description: "기억을 더듬어 보는 학창 시절 밸런스 게임!",
    startQuestion: 11,
    endQuestion: 17,
  },
  {
    id: 3,
    title: "상상초월편",
    subtitle: "만약 내게 이런 일이?",
    emoji: "🌌",
    description: "상상만 해도 아찔한 밸런스 게임!",
    startQuestion: 18,
    endQuestion: 22,
  },
];

export const questions: Question[] = [
  // === 카테고리 1: 워밍업 - 취향편 ===
  {
    id: 1,
    category: 1,
    emoji: "🥘",
    title: "떡볶이는 당연!",
    optionA: "밀떡",
    optionB: "쌀떡",
  },
  {
    id: 2,
    category: 1,
    emoji: "🐟",
    title: "붕어빵 논쟁",
    optionA: "팥",
    optionB: "슈크림",
  },
  {
    id: 3,
    category: 1,
    emoji: "❌",
    title: "평생 한 입 금지",
    optionA: "떡볶이 포기",
    optionB: "삼겹살 포기",
  },
  {
    id: 4,
    category: 1,
    emoji: "🎬",
    title: "영화관 필수템",
    optionA: "팝콘",
    optionB: "나초&오징어",
  },
  {
    id: 5,
    category: 1,
    emoji: "🍿",
    title: "영화 보는 최적 조건",
    optionA: "침대 + 간식",
    optionB: "영화관 + 팝콘",
  },
  {
    id: 6,
    category: 1,
    emoji: "🎵",
    title: "지금 나의 플레이리스트",
    optionA: "최신 인기곡",
    optionB: "추억 명곡",
  },
  {
    id: 7,
    category: 1,
    emoji: "🧳",
    title: "여행 가서 더 중요한 것",
    optionA: "관광지 정복",
    optionB: "숙소에 진심",
  },
  {
    id: 8,
    category: 1,
    emoji: "⏰",
    title: "갑자기 생긴 반나절",
    optionA: "아무것도 안 하기",
    optionB: "미뤄둔 일 몰아치기",
  },
  {
    id: 9,
    category: 1,
    emoji: "🛍️",
    title: "쇼핑 이럴 때 뿌듯",
    optionA: "세일 + 쿠폰 + 카드할인으로 최저가 성공",
    optionB: "품절템 우연히 득템",
  },
  {
    id: 10,
    category: 1,
    emoji: "🧠",
    title: "하루 능력 획득",
    optionA: "뭐든 들으면 바로 이해",
    optionB: "뭐든 들으면 모두 다 기억",
  },

  // === 카테고리 2: 학창 시절편 ===
  {
    id: 11,
    category: 2,
    emoji: "📝",
    title: "시험 고수들의 숨은 모습",
    optionA: "시험 한달 전부터 형광펜 칠해가며 시험 준비하는 철저한 계획형",
    optionB: "시험 전날 \"지금부터 하면 8시간이나 남았네?\"라며 근거 없는 자신감 넘치는 벼락치기 장인",
  },
  {
    id: 12,
    category: 2,
    emoji: "🤝",
    title: "시험 당일 아침",
    optionA: "\"야, 너만 믿는다\"며 공부 잘하는 친구 옆에서 족집게 과외받는 기생형",
    optionB: "\"이거 무조건 나와\"라며 중요한 부분 쏙쏙 찝어주는 친구들의 과외선생님",
  },
  {
    id: 13,
    category: 2,
    emoji: "👀",
    title: "수업 시간의 내 모습",
    optionA: "선생님이 질문 시킬까 봐 투명 인간이 되길 기도하며 필사적으로 땅만 보는 모내기형",
    optionB: "\"선생님, 저 여기 있어요!\"라는 눈빛으로 뚫어지게 눈 마주치며 발표 기회 노리는 야망형",
  },
  {
    id: 14,
    category: 2,
    emoji: "⚖️",
    title: "그래! 결심했어!",
    optionA: "반 친구의 비행을 보고 \"난 아무것도 모른다\"며 조용히 눈감아주는 의리형 내지는 갈등 회피형",
    optionB: "\"이건 그 친구의 미래를 위한 거야\"라며 조용히 선생님 교무실로 향하는 정의의 사도",
  },
  {
    id: 15,
    category: 2,
    emoji: "🏃",
    title: "쉬는 시간을 임하는 자세",
    optionA: "종 치자마자 우사인 볼트 빙의해서 매점 빵 쟁취하러 달려가는 매점 사냥꾼",
    optionB: "쉬는 시간 10분은 신이 주신 수면 시간이라며 책상과 물아일체 되는 잠자는 교실의 공주/왕자",
  },
  {
    id: 16,
    category: 2,
    emoji: "🧭",
    title: "장래희망",
    optionA: "생활기록부 장래희망이 매년 바뀌는 꿈나무 컬렉터",
    optionB: "초딩 때부터 고딩 때까지 오직 한 길만 고집한 한우물형",
  },
  {
    id: 17,
    category: 2,
    emoji: "💢",
    title: "얘가 더 싫어",
    optionA: "문제 하나 틀렸다고 눈물 뚝뚝 흘리는 반 1등",
    optionB: "시험 전날 전화해서 같이 놀자고 꼬시는 절친",
  },

  // === 카테고리 3: 상상초월편 ===
  {
    id: 18,
    category: 3,
    emoji: "💰",
    title: "자고 일어났더니 통장에 100억이 꽂혔다!",
    optionA: "\"수고하셨습니다!\" 외치고 바로 퇴사해서 서울 요지에 건물 올리는 갓물주형",
    optionB: "\"내 능력을 맘껏 보여주지!\" 내 이름 박힌 간판 달고 회장님 소리 듣는 야망CEO형",
  },
  {
    id: 19,
    category: 3,
    emoji: "✨",
    title: "초능력이 생긴다면?",
    optionA: "모든 사람의 속마음을 자막처럼 읽을 수 있는 '독심술'",
    optionB: "내가 원하는 곳 어디든 1초 만에 이동하는 '순간이동'",
  },
  {
    id: 20,
    category: 3,
    emoji: "💬",
    title: "평생 '좋아요' 아니면 '싫어요' 둘 중 하나만 대답해야한다.",
    optionA: "모든 질문에 \"좋아요!\"라고만 답하는 '예스맨 무한긍정러'",
    optionB: "평생 모든 질문에 \"싫어요!\"라고만 답하는 '단호박 거절러'",
  },
  {
    id: 21,
    category: 3,
    emoji: "🏢",
    title: "둘 중 한 곳에 출장을 가야한다!",
    optionA: "비행기만 20시간! 휴대폰 신호조차 안 잡히는 쌩오지, 강제 자연인 출장",
    optionB: "뉴욕 타임스퀘어 최고급 호텔, 그러나 잠도 못 자고 일만 하는 뉴욕 노예 출장",
  },
  {
    id: 22,
    category: 3,
    emoji: "⏳",
    title: "타임머신을 탈 기회가 왔다! (단, 기억 삭제)",
    optionA: "과거로 가서 이불킥할 내 흑역사 하나 지우고 오기",
    optionB: "미래로 가서 내가 몇 살에 은퇴하고 어떻게 사는지 구경하고 오기",
  }
];

export const TOTAL_QUESTIONS = questions.length;

export function getCategoryForQuestion(questionId: number): Category | undefined {
  return categories.find(
    (c) => questionId >= c.startQuestion && questionId <= c.endQuestion
  );
}

export function isFirstOfCategory(questionId: number): boolean {
  return categories.some((c) => c.startQuestion === questionId);
}
