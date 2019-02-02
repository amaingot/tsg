import { WithStyles } from '@material-ui/core';

export interface CommonProps extends WithStyles {
  children?: React.ReactNode;
  className?: string;
}
