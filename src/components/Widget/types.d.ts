import React from 'react';
import { WidgetDataType } from '../../types';

export interface WidgetProps {
  weatherReport: WidgetDataType;
  handleToggleSettings: (e: React.MouseEvent) => void;
}
