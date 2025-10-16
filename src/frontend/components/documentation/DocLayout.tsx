// src/frontend/components/documentation/DocLayout.tsx
import { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { headingStyle } from '../../styles/styles';
import type { ThemeSprings } from '../../../types/types';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  title: string;
  children: ReactNode;
  themeSprings?: ThemeSprings; // optional; we derive real springs if absent
};

export const DocLayout = ({ title, children, themeSprings }: Props) => {
  // never fabricate ThemeSprings; get real springs from the hook
  const [fallbackTs] = useTheme(undefined);
  const ts = themeSprings ?? fallbackTs;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px', width: '100%' }}>
      <animated.h1 style={{ ...headingStyle(ts), textAlign: 'center', marginBottom: 20 }}>
        {title}
      </animated.h1>
      {children}
    </div>
  );
};

export default DocLayout;