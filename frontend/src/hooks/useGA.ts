/**
 * @author Hyeonsooryu
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const useGA = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // 개발환경이 아닐 경우에만 GA initialize
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(`${process.env.REACT_APP_GA_TRACKING_ID}`);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);

  /*
   * GA 디버깅용 코드
   * 개발환경에서도 GA initialize
   * debug 옵션이 설정되어 console에 트래킹 정보가 출력된다.
   */
  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_GA_TRACKING_ID}`, {
      debug: true,
    });
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default useGA;
