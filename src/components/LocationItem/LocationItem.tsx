import React from 'react';

import { Icon } from '@iconify/react';
import DragIcon from '@iconify/icons-ic/outline-drag-handle';

import styles from './LocationItem.module.scss';
import { LocationItemProps } from './types';

const LocationItem = ({ location }: LocationItemProps) => {
  return (
    <div className={styles.item}>
      <Icon icon={DragIcon} className={styles.dragIcon} />
      {location.name}
    </div>
  );
};

export default LocationItem;
