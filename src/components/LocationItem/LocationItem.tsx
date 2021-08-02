import React from 'react';

import { observer } from 'mobx-react-lite';

import { useDataStore } from '../../store/context';

import { Icon } from '@iconify/react';
import DragIcon from '@iconify/icons-ic/outline-drag-handle';
import DeleteIcon from '@iconify/icons-ic/outline-delete-outline';

import styles from './LocationItem.module.scss';
import { LocationItemProps } from './types';

const LocationItem = observer(({ location }: LocationItemProps) => {
  const store = useDataStore();
  const { deleteLocation } = store;

  const handleDeleteLocation = (id: number) => () => {
    deleteLocation(id);
  };

  return (
    <div className={styles.item}>
      <Icon icon={DragIcon} className={styles.dragIcon} />
      {location.name}
      <span className={styles.deleteIcon} onClick={handleDeleteLocation(location.id)}>
        <Icon icon={DeleteIcon} />
      </span>
    </div>
  );
});

export default LocationItem;
