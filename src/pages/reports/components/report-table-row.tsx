import {useCallback, useState} from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, {menuItemClasses} from '@mui/material/MenuItem';

import {Iconify} from '../../../components/iconify';
import {useNavigate} from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'
import {ReportType} from "../../../components/types/ReportType.ts";
import {fetchDeleteReport} from "../../../components/api";
import {monthNames} from "./utils.ts";

// ----------------------------------------------------------------------

type ReportTableRowProps = {
  row: ReportType;
  selected: boolean;
  onSelectRow: () => void;
};

export function ReportTableRow({ row, selected, onSelectRow }: ReportTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    const navigate = useNavigate();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

    const handleUpdate = useCallback(() => {
        navigate("/activity-report/update?id="+row.id, { replace: true });
        setOpenPopover(null);
    }, []);

    const handleDelete = useCallback(() => {
        fetchDeleteReport(row.id);
        window.location.reload();
        setOpenPopover(null);
    }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
              {monthNames[row.month]} {row.year}
          </Box>
        </TableCell>

        <TableCell>{monthNames[row.billed_month]} {row.billed_year}</TableCell>

        <TableCell>
            {row.billed ? (
                <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
            ) : (
                '-'
            )}</TableCell>

        <TableCell>{row.calculated.total_tax_included} {getSymbolFromCurrency("GBP")}</TableCell>

        <TableCell align="center">
          {row.create_at}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleUpdate}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
