

const INCREASE = 'counter/INCREASE' as const;

export const increase = () => ({
  type: INCREASE
});

// 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다