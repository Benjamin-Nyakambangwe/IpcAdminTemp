import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

// ----------------------------------------------------------------------

JobTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function JobTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewApplicants }) {
  const theme = useTheme();

  // const { name, avatarUrl, company, role, isVerified, status } = row;
  const { client, job_title, sector, location, status, applicants, guest_applicants, registered_applicants } = row;

  console.log('ROWWWWW', row)

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
        <Typography variant="subtitle2" noWrap>
          {client.client}
        </Typography>
      </TableCell>

      <TableCell align="left">{job_title}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {sector.sector}
      </TableCell>

      <TableCell align="center">
        {/* <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        /> */}
        {location.city}
      </TableCell>

      <TableCell align="center">
        {registered_applicants.length + guest_applicants.length}
      </TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status.job_status !== 'Placement' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status.job_status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <a href={`/dashboard/job/${row.job_id}/edit/`}>
                <Iconify icon={'eva:edit-fill'} />
                </a>
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onViewApplicants();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                View Applicants
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
