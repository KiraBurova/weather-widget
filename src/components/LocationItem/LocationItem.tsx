import React from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@iconify/react';
import DragIcon from '@iconify/icons-ic/outline-drag-handle';
import DeleteIcon from '@iconify/icons-ic/outline-delete-outline';

import { useStore } from '../../store/context';

import { LocationItemProps } from './types';
import styles from './LocationItem.module.scss';

const LocationItem = observer(({ location, dragHandleProps }: LocationItemProps) => {
  const store = useStore();
  const { deleteLocation } = store;

  const handleDeleteLocation = (name: string) => () => {
    deleteLocation(name);
  };

  return (
    <div className={styles.item}>
      <div {...dragHandleProps}>
        <Icon icon={DragIcon} className={styles.dragIcon} />
      </div>
      {location.name}
      <span className={styles.deleteIcon} onClick={handleDeleteLocation(location.name)} role='button'>
        <Icon icon={DeleteIcon} />
      </span>
    </div>
  );
});

export default LocationItem;
