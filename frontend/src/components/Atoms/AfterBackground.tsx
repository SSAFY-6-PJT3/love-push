/**
 * @author Hyeonsooryu
 */
import { useTransition, animated, config } from 'react-spring';
import styled from 'styled-components';

const AfterBackGround = ({ show }: { show: boolean }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 140,
    config: config.molasses,
  });

  return transitions((styles, item) => item && <AfterBg style={styles} />);
};

const AfterBg = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  z-index: -1;
  background: linear-gradient(
    32.33deg,
    #ff9a9e 0%,
    #fad0c4 68.68%,
    #fad0c4 69.38%
  );
  background-repeat: no-repeat;
`;

export default AfterBackGround;
