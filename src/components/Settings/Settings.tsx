import React from 'react';
import { observer } from 'mobx-react-lite';

import { Icon } from '@iconify/react';
import CloseSettingsIcon from '@iconify/icons-ic/close';

import { useDataStore } from '../../store/context';

import LocationItem from '../LocationItem';
import AddLocation from '../AddLocation';

import { SettingsProps } from './types';
import styles from './Settings.module.scss';

const Settings = observer(({ handleToggleSettings }: SettingsProps) => {
  const store = useDataStore();
  const { locations } = store;

  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <span>Settings</span>
        <div onClick={handleToggleSettings}>
          <Icon icon={CloseSettingsIcon} className={styles.settingsIcon} />
        </div>
      </div>
      {!!locations.length && (
        <div className={styles.addedLocations}>
          {locations.map((location) => (
            <LocationItem key={location.id} location={location} />
          ))}
        </div>
      )}
      <AddLocation />
    </div>
  );
});

export default Settings;
