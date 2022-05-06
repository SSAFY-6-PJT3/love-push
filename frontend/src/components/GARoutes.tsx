/**
 * @author Hyeonsooryu
 */
import { ReactNode } from 'react';
import { Routes } from 'react-router-dom';

import useGA from '../hooks/useGA';

const GARoutes = ({ children }: { children: ReactNode }) => {
  useGA();
  return <Routes>{children}</Routes>;
};

export default GARoutes;
