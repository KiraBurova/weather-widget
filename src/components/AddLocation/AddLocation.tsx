import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TLocation } from '../../types';

import { useDataStore } from '../../store/context';
import styles from './AddLocation.module.scss';

const AddLocation = observer(() => {
  const store = useDataStore();
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
    <form className={styles.addContainer} onSubmit={handleSubmitLocation}>
      <input autoFocus className={styles.locationInput} value={inputtedLocation} onChange={handleChangeLocation} />
      <button type='submit' className={styles.addButton} disabled={!inputtedLocation}>
        Add
      </button>
    </form>
  );
});

export default AddLocation;
