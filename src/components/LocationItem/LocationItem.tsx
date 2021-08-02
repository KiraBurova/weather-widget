import React from 'react';

import { Icon } from '@iconify/react';
import DragIcon from '@iconify/icons-ic/outline-drag-handle';

import styles from './LocationItem.module.scss';

const LocationItem = () => {
  return (
    <div className={styles.item}>
      <Icon icon={DragIcon} className={styles.dragIcon} />
      Location item
    </div>
  );
};

export default LocationItem;
