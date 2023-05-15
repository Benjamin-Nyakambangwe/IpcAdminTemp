import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button } from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import Link from 'next/link';

// ----------------------------------------------------------------------

EventsTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function EventsTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewApplicants }) {
  const theme = useTheme();

  // const { name, avatarUrl, company, role, isVerified, status } = row;
  const { id, heading, date } = row;
  // const cv = `${process.env.NEXT_PUBLIC_API_URL}/${resume}`

  function isExpired(date) {
    const today = new Date();


    today.setHours(0, 0, 0, 0);

    return date < today;
  }

  // console.log(isExpired(new Date()));

  // console.log(isExpired(new Date(date)));

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
          {id}
        </Typography>
      </TableCell>

      <TableCell align="left">{heading}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {date}
      </TableCell>

      {/* <TableCell align="center"> */}
      {/* <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        /> */}
      {/* {gender} */}
      {/* </TableCell> */}

      {/* <TableCell align="center">
        {resume === null || undefined ? 'No Resume' :
          <Button variant="contained">
            <Link href={cv} target="_blank" download><p style={{ textTransform: 'capitalize', color: 'white' }}>Resume</p></Link>
          </Button>}
      </TableCell> */}


      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(isExpired(new Date(date)) === true && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {isExpired(new Date(date)) === true ? 'Expired' : 'Active'}
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
                <Iconify icon={'eva:edit-fill'} />
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
