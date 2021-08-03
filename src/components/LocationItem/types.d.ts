import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { TLocation } from '../../types';

export interface LocationItemProps {
  location: TLocation;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}
