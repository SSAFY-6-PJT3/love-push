import { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';

import Beforeheart from '../../images/icon/heart2.svg';
import Afterheart from '../../images/icon/heart1.svg';

interface IPropsHeartBtn {
  show: boolean;
  onClickHeart: () => void;
}

const HeartBtn = ({ show, onClickHeart }: IPropsHeartBtn) => {
  const transitions = useTransition(show, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 140,
    config: config.molasses,
  });
  return transitions(({ opacity }, item) =>
    item ? (
      <animated.img
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
        src={Afterheart}
        onClick={onClickHeart}
      />
    ) : (
      <animated.img
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
        src={Beforeheart}
        onClick={onClickHeart}
      />
    ),
  );
};

export default HeartBtn;
