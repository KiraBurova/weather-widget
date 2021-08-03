import React from 'react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../store/context';

import { Icon } from '@iconify/react';
import DragIcon from '@iconify/icons-ic/outline-drag-handle';
import DeleteIcon from '@iconify/icons-ic/outline-delete-outline';

import styles from './LocationItem.module.scss';
import { LocationItemProps } from './types';

const LocationItem = observer(({ location, dragHandleProps }: LocationItemProps) => {
  const store = useStore();
  const { deleteLocation } = store;

  const handleDeleteLocation = (id: number) => () => {
    deleteLocation(id);
  };

  return (
    <div className={styles.item}>
      <div {...dragHandleProps}>
        <Icon icon={DragIcon} className={styles.dragIcon} />
      </div>
      {location.name}
      <span className={styles.deleteIcon} onClick={handleDeleteLocation(location.id)}>
        <Icon icon={DeleteIcon} />
      </span>
    </div>
  );
});

export default LocationItem;
