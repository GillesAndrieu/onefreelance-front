import type {SxProps, Theme} from '@mui/material/styles';
// @ts-ignore
import type {Props as SimplebarProps} from 'simplebar-react';

// ----------------------------------------------------------------------

export type ScrollbarProps = SimplebarProps & {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  fillContent?: boolean;
  slotProps?: {
    wrapper?: SxProps<Theme>;
    contentWrapper?: SxProps<Theme>;
    content?: Partial<SxProps<Theme>>;
  };
};
