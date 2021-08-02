import React from 'react';

import { Icon } from '@iconify/react';
import CloseSettingsIcon from '@iconify/icons-ic/close';

import styles from './Settings.module.scss';

import { SettingsProps } from './types';

const Settings = ({ handleOpenSettings }: SettingsProps) => {
  return (
    <div>
      <div className={styles.settingsTop}>
        <span>Settings</span>
        <div onClick={handleOpenSettings}>
          <Icon icon={CloseSettingsIcon} className={styles.settingsIcon} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
