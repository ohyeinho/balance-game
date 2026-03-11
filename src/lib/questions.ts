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
    title: "직장생활편",
    subtitle: "월급쟁이의 생존 본능",
    emoji: "\uD83D\uDCBC",
    description: "게임은 게임일 뿐 오해하지 말자~",
    startQuestion: 1,
    endQuestion: 10,
  },
  {
    id: 2,
    title: "상상초월 상황극",
    subtitle: "만약에... 로또 된다면?",
    emoji: "\uD83E\uDE84",
    description: "게임은 게임일 뿐 오해하지 말자~",
    startQuestion: 11,
    endQuestion: 20,
  },
  {
    id: 3,
    title: "학창시절편",
    subtitle: "네 과거를 말해봐",
    emoji: "\uD83C\uDF92",
    description: "게임은 게임일 뿐 오해하지 말자~",
    startQuestion: 21,
    endQuestion: 30,
  },
];

export const questions: Question[] = [
  // === 카테고리 1: 직장생활편 ===
  {
    id: 1,
    category: 1,
    emoji: "\uD83D\uDCBB",
    title: "출근 첫 루틴",
    optionA: "접속하자마자 '오늘 내 할 일' 리스트부터 확인하며 머릿속으로 시뮬레이션 돌리는 '갓생 설계형'",
    optionB: "접속하자마자 '공지사항'이나 '동료들 상태 메시지'부터 훑으며 밤사이 무슨 일 없었나 살피는 '뉴스 데스크형'",
  },
  {
    id: 2,
    category: 1,
    emoji: "\uD83C\uDFD5\uFE0F",
    title: "워크숍 스타일",
    optionA: "체력을 영혼까지 끌어모아 팀 대항 게임하고 장기 자랑하며 단체 티셔츠를 땀으로 적시는 '서바이벌 체육대회'",
    optionB: "산속 깊은 곳에서 묵언 수행하며 흙 만지고 도자기 빚으며 \"나는 누구인가\"를 고뇌하는 '적막 속의 힐링'",
  },
  {
    id: 3,
    category: 1,
    emoji: "\uD83D\uDDE3\uFE0F",
    title: "회의 지옥",
    optionA: "다들 웃으며 잔잔하게 대화하지만 3시간이 순삭되어 퇴근 시간이 실종되는 '평화로운 희망고문형'",
    optionB: "단 10분 만에 영혼이 탈탈 털리고 머리가 하얘지지만 어쨌든 칼퇴는 사수하는 '초스피드 압박번개형'",
  },
  {
    id: 4,
    category: 1,
    emoji: "\u2615",
    title: "커피 쏘기 눈치 작전",
    optionA: "커피 타임마다 \"자, 가위바위보 합시다!\"를 선창하며 내 지갑의 운명을 하늘에 맡기는 '한판승부 도박형'",
    optionB: "동료들이 가위바위보를 하든 말든 \"저만 아아면 됩니다\"라고 읊조리며 지갑을 지키는 '스텔스 생존형'",
  },
  {
    id: 5,
    category: 1,
    emoji: "\uD83C\uDFD6\uFE0F",
    title: "휴가의 공포",
    optionA: "휴가 전까지 아무일 없이 평화롭다가, 휴가 중에 상사에게 급한 전화 딱 한 번 받기",
    optionB: "휴가 가기 전 한달 동안 미친듯이 바쁘다가 휴가 중에 회사에서 아무 연락 안받기",
  },
  {
    id: 6,
    category: 1,
    emoji: "\uD83E\uDD16",
    title: "AI 시대의 선택",
    optionA: "AI가 디자인은 다 해주는 세상! 내 기획력을 폭발시켜 프로젝트 전체를 내 마음대로 주무르는 '전지전능 기획팀'",
    optionB: "AI가 코딩은 완벽하게 해줄 테니 나는 명령만 내리며 개발의 정점에 서는 '키보드 마스터 개발팀'",
  },
  {
    id: 7,
    category: 1,
    emoji: "\uD83D\uDCBA",
    title: "책상의 저주",
    optionA: "점심 메뉴부터 어제 본 드라마까지 6G급 속도로 수다를 쏟아내 내 귀에 피가 나게 하는 동료 옆자리",
    optionB: "하루 종일 키보드 소리와 숨소리밖에 안 들려주는 동료 옆자리",
  },
  {
    id: 8,
    category: 1,
    emoji: "\uD83C\uDFAF",
    title: "과제의 선택",
    optionA: "전사적으로 주목받고 과정은 빡세지만 성공하면 확실히 인정받는 '하이리스크 하이리턴 과제'",
    optionB: "성과가 눈에 확 띄진 않지만 큰 사고 없이 조용히 마무리할 수 있는 '로우리스크 실속형 과제'",
  },
  {
    id: 9,
    category: 1,
    emoji: "\uD83D\uDCB0",
    title: "미래의 연봉",
    optionA: "연봉이 매년 수직 상승하지만 주 6일 출근에 휴가 따위는 역사책에서나 볼 수 있는 삶",
    optionB: "연봉은 평생 동결이지만 칼퇴가 법이고 일 년에 한 달은 유급 휴가로 해외여행 갈 수 있는 삶",
  },
  {
    id: 10,
    category: 1,
    emoji: "\uD83D\uDE97",
    title: "최후의 선택",
    optionA: "왕복 3시간 길바닥에 버려도 통장에 꽂히는 숫자를 보며 모든 고통을 치유하는 삶",
    optionB: "왕복 10분 컷이라 아침에 눈 뜨면 바로 회사지만 통장은 항상 다이어트 중인 삶",
  },

  // === 카테고리 2: 상상초월 상황극 ===
  {
    id: 11,
    category: 2,
    emoji: "\uD83D\uDCB8",
    title: "100억의 행복",
    optionA: "자고 일어났더니 통장에 100억! \"수고하셨습니다!\" 외치고 바로 퇴사해서 서울 요지에 건물 올리는 '갓물주형'",
    optionB: "\"내 능력을 맘껏 보여주지!\" 내 이름 박힌 간판 달고 회장님 소리 듣는 '야망CEO형'",
  },
  {
    id: 12,
    category: 2,
    emoji: "\uD83E\uDDD9",
    title: "초능력 선택",
    optionA: "모든 사람의 속마음을 자막처럼 읽을 수 있는 '독심술'",
    optionB: "내가 원하는 곳 어디든 1초 만에 이동하는 '순간이동'",
  },
  {
    id: 13,
    category: 2,
    emoji: "\uD83C\uDF6D",
    title: "미각의 상실",
    optionA: "평생 모든 음식에서 설탕 들이부은 '단맛'만 느끼기 (삼겹살도 솜사탕 맛)",
    optionB: "평생 모든 음식에서 캡사이신 쏟은 '매운맛'만 느끼기 (아이스크림도 불닭 맛)",
  },
  {
    id: 14,
    category: 2,
    emoji: "\uD83D\uDC4D",
    title: "리액션 고립",
    optionA: "평생 모든 질문에 \"좋아요!\"라고만 답하는 '예스맨 무한긍정러'",
    optionB: "평생 모든 질문에 \"싫어요!\"라고만 답하는 '단호박 거절러' (팀장님 지시에도 \"싫어요\")",
  },
  {
    id: 15,
    category: 2,
    emoji: "\u2708\uFE0F",
    title: "출장의 딜레마",
    optionA: "비행기 20시간! 휴대폰 신호도 안 잡히는 쌩오지에서 노트북 덮고 일주일 내내 풀벌레 소리만 들으며 멍 때리는 '강제 자연인 출장'",
    optionB: "뉴욕 타임스퀘어 최고급 호텔에 갇혀서 일주일 내내 룸서비스만 먹으며 잠도 못 자고 일만 하는 '뉴욕 노예 출장'",
  },
  {
    id: 16,
    category: 2,
    emoji: "\uD83D\uDC54",
    title: "내가 사장이라면?",
    optionA: "연봉은 적지만 모두가 가족같이 화목한 '공동체형 기업' 사장",
    optionB: "연봉은 업계 최고지만 매일이 전쟁터인 '성과주의 능력자형' 사장",
  },
  {
    id: 17,
    category: 2,
    emoji: "\u23F0",
    title: "기억 삭제 타임머신",
    optionA: "과거로 가서 이불킥할 내 흑역사 하나 지우고 오기",
    optionB: "미래로 가서 내가 몇 살에 은퇴하고 어디서 어떻게 사는지 구경하고 오기",
  },
  {
    id: 18,
    category: 2,
    emoji: "\uD83D\uDC55",
    title: "패션의 감옥",
    optionA: "나의 존재감은 갖다버려 올 블랙만 입는 '인간 그림자' (양말 신발도 전부 블랙)",
    optionB: "반사판 댄 것처럼 눈부신 올 화이트만 입는 '인간 형광등' (양말 신발도 전부 화이트)",
  },
  {
    id: 19,
    category: 2,
    emoji: "\uD83C\uDFDD\uFE0F",
    title: "불시착 서바이벌",
    optionA: "5일만 버티면 구조대가 오지만 먹을 것이라곤 오직 잡초와 빗물 뿐인 극한의 무인도",
    optionB: "먹을 것은 풍족하지만 구조대가 언제 올지 몰라 알아서 생존해야 하는 지상낙원",
  },
  {
    id: 20,
    category: 2,
    emoji: "\uD83E\uDE84",
    title: "마법 지팡이",
    optionA: "손가락 까딱하면 내 일 다해줌",
    optionB: "내 외모를 원하는 연예인으로 바꿀 수 있음",
  },

  // === 카테고리 3: 학창시절편 ===
  {
    id: 21,
    category: 3,
    emoji: "\uD83D\uDEB6",
    title: "쉬는 시간 유형",
    optionA: "쉬는 시간마다 복도 나가서 전교생 소식 다 물어보는 '오지라퍼'",
    optionB: "다음 수업을 위해 죽은 듯이 기를 모으는 '자리 지박령'",
  },
  {
    id: 22,
    category: 3,
    emoji: "\uD83D\uDCDA",
    title: "시험 준비 스타일",
    optionA: "시험 한달 전부터 형광펜 칠해가며 시험 준비하는 '철저한 계획형'",
    optionB: "시험 전날 \"지금부터 하면 8시간이나 남았네?\"라며 근거 없는 자신감의 '벼락치기 장인'",
  },
  {
    id: 23,
    category: 3,
    emoji: "\uD83E\uDD1D",
    title: "공부 파트너",
    optionA: "\"야, 너만 믿는다\" 공부 잘하는 친구 옆에서 족집게 과외받는 '기생형'",
    optionB: "\"이거 무조건 나와\" 중요한 부분 쏙쏙 찝어주는 '친구들의 과외선생님'",
  },
  {
    id: 24,
    category: 3,
    emoji: "\uD83D\uDE48",
    title: "수업 시간 태도",
    optionA: "선생님이 질문 시킬까 봐 투명 인간이 되길 기도하며 필사적으로 땅만 보는 '모내기형'",
    optionB: "\"선생님, 저 여기 있어요!\"라는 눈빛으로 뚫어지게 눈 마주치며 발표 기회 노리는 '야망형'",
  },
  {
    id: 25,
    category: 3,
    emoji: "\u2696\uFE0F",
    title: "정의 vs 의리",
    optionA: "반 친구의 비행을 보고 \"난 아무것도 모른다\"며 조용히 눈감아주는 '갈등 회피형'",
    optionB: "\"이건 그 친구의 미래를 위한 거야\"라며 조용히 교무실로 향하는 '정의의 사도'",
  },
  {
    id: 26,
    category: 3,
    emoji: "\uD83C\uDF5E",
    title: "종소리의 의미",
    optionA: "종 치자마자 우사인 볼트 빙의해서 매점 빵 쟁취하러 달려가는 '매점 사냥꾼'",
    optionB: "쉬는 시간 10분은 신이 주신 수면 시간이라며 책상과 물아일체 되는 '잠자는 교실의 공주/왕자'",
  },
  {
    id: 27,
    category: 3,
    emoji: "\uD83C\uDF1F",
    title: "장래희망",
    optionA: "생활기록부 장래희망이 매년 바뀌는 '꿈나무 컬렉터'",
    optionB: "초딩 때부터 고딩 때까지 오직 한 길만 고집한 '한우물형'",
  },
  {
    id: 28,
    category: 3,
    emoji: "\uD83D\uDE08",
    title: "시험 전날",
    optionA: "시험 하나 틀렸다고 나라 잃은 것처럼 대성통곡하는 '재수 없는 전교 1등'",
    optionB: "시험 전날 \"공부해서 뭐 하냐\"며 1시간마다 전화해서 같이 놀자고 꼬시는 '악마의 유혹'",
  },
  {
    id: 29,
    category: 3,
    emoji: "\uD83D\uDC68\u200D\uD83C\uDFEB",
    title: "선생님 유형",
    optionA: "\"이거 다 알지?\" 10분 만에 수업 끝내고 자습해라 하는 '놀자판 선생님'",
    optionB: "종 쳐도 \"요것만 더 보자\"며 다음 시간 쉬는 시간까지 뺏는 '열정 과부하 선생님'",
  },
  {
    id: 30,
    category: 3,
    emoji: "\uD83D\uDE80",
    title: "시간 여행",
    optionA: "자고 일어났더니 초등학생! \"야호! 이번 생은 갓생이다!\" 학교와 학원을 누비며 엄친아/엄친딸을 꿈꾸기",
    optionB: "\"안돼!!! 내 소중한 월급, 나의 음주가무, 내 쇼핑, 내 자유...\" 잃어버린 성인의 맛을 그리워하며 대성통곡",
  },
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
