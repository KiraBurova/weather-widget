import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TLocation } from '../../types';
import { Icon } from '@iconify/react';
import AddIcon from '@iconify/icons-ic/outline-subdirectory-arrow-left';
import { useStore } from '../../store/context';
import styles from './AddLocation.module.scss';

const AddLocation = observer(() => {
  const store = useStore();
  const { fetchWeatherReportByCityName } = store;

  const [inputtedLocation, setInputtedLocation] = useState('');

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputtedLocation(value);
  };

  const handleSubmitLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const location: TLocation = {
      name: inputtedLocation,
      id: Math.random(),
    };
    fetchWeatherReportByCityName(location);
    setInputtedLocation('');
  };

  return (
    <div>
      <span className={styles.formLabel}>Add location:</span>
      <form className={styles.form} onSubmit={handleSubmitLocation}>
        <input autoFocus className={styles.locationInput} value={inputtedLocation} onChange={handleChangeLocation} />
        <button type='submit' className={styles.addButton} disabled={!inputtedLocation}>
          <Icon icon={AddIcon} />
        </button>
      </form>
    </div>
  );
});

export default AddLocation;
