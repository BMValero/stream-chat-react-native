import React from 'react';

import { useTheme } from '../../../contexts/themeContext/ThemeContext';
import { Camera } from '../../../icons';

export const CameraSelectorIcon: React.FC = () => {
  const {
    theme: {
      colors: { grey },
    },
  } = useTheme('CameraSelectorIcon');

  return <Camera pathFill={grey} />;
};
