import React from 'react';
import { observer } from 'mobx-react-lite';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { Icon } from '@iconify/react';
import CloseSettingsIcon from '@iconify/icons-ic/close';

import { useDataStore } from '../../store/context';

import LocationItem from '../LocationItem';
import AddLocation from '../AddLocation';

import { SettingsProps } from './types';
import styles from './Settings.module.scss';

const Settings = observer(({ handleToggleSettings }: SettingsProps) => {
  const store = useDataStore();
  const { locations, reorderLocations } = store;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    reorderLocations(locations, result.source.index, result.destination.index);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <span>Settings</span>
        <div onClick={handleToggleSettings}>
          <Icon icon={CloseSettingsIcon} className={styles.settingsIcon} />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div className={styles.addedLocations} {...provided.droppableProps} ref={provided.innerRef}>
              {locations.map((location, index) => (
                <Draggable key={location.id} draggableId={'' + location.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style, marginTop: '5px' }}>
                      <LocationItem key={location.id} location={location} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddLocation />
    </div>
  );
});

export default Settings;
