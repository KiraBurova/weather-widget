import React from 'react';
import { WidgetDataType } from '../../types';

export interface WidgetProps {
  weatherReport: WidgetDataType;
  handleOpenSettings: (e: React.MouseEvent) => void;
}
