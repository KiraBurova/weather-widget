import React from 'react';
import { TWidgetData } from '../../types';

export interface WidgetProps {
  weatherReport: TWidgetData;
  handleToggleSettings: (e: React.MouseEvent) => void;
}
