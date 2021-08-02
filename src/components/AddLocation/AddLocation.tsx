import React, { useState } from 'react';

import styles from './AddLocation.module.scss';

const AddLocation = () => {
  const [location, setLocation] = useState('');

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  };

  return (
    <div className={styles.addContainer}>
      <input className={styles.locationInput} onChange={handleChangeLocation} />
      <button className={styles.addButton} disabled={!location}>
        Add
      </button>
    </div>
  );
};

export default AddLocation;
