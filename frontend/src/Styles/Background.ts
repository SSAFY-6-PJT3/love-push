import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(197.56deg, #63dae2 0%, #7fade8 100%);
  background-repeat: no-repeat;
  height: calc(var(--vh, 1vh) * 100);
  // @supports (-webkit-touch-callout: none) {
  //   height: -webkit-fill-available;
  // }
`;

export default Background;
