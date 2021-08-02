import React from 'react';

import { Icon } from '@iconify/react';
import CloseSettingsIcon from '@iconify/icons-ic/close';

import LocationItem from '../LocationItem';
import AddLocation from '../AddLocation';

import { SettingsProps } from './types';
import styles from './Settings.module.scss';

const Settings = ({ handleOpenSettings }: SettingsProps) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <span>Settings</span>
        <div onClick={handleOpenSettings}>
          <Icon icon={CloseSettingsIcon} className={styles.settingsIcon} />
        </div>
      </div>
      <div className={styles.addedLocations}>
        <LocationItem />
      </div>
      <AddLocation />
    </div>
  );
};

export default Settings;
