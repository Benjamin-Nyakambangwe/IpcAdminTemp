import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link'
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

// ----------------------------------------------------------------------

JobApplicantsRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function JobApplicantsRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewApplicants }) {
  const theme = useTheme();

  // const { name, avatarUrl, company, role, isVerified, status } = row;
  const { client, job_title, sector, location, status, applicants } = row;

  console.log('APPLICANTS ROW', row)
  const resumeURL = `${process.env.NEXT_PUBLIC_API_URL}/${row.resume}`

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
        <Typography variant="subtitle2" noWrap>
          {row.first_name} {row.last_name}
        </Typography>
      </TableCell>



      {/* <TableCell align="left">
        {row.gender !== null ? row.gender : 'N/A'}
      </TableCell> */}

      {/* <TableCell align="left">
        {row.phone !== null ? row.phone : 'N/A'}
      </TableCell> */}

      <TableCell align="left">
        {row.organization !== null ? row.organization : 'N/A'}
      </TableCell>
      <TableCell align="left">
        {row.sector !== null ? row.sector : 'N/A'}
      </TableCell>
      <TableCell align="left">
        {row.qualifications !== null ? row.qualifications : 'N/A'}
      </TableCell>

      <TableCell align="left">{row.experience
        !== null ? row.experience
        : 'N/A'}</TableCell>

      {/* <TableCell align="left">
        Date
      </TableCell> */}

      <TableCell align="left">
        <Label
          variant={'filled'}
          color={'success'}
          sx={{ textTransform: 'capitalize' }}

        >
          <Link href={resumeURL} target="_blank" download><p style={{ textTransform: 'capitalize', color: 'white' }}>Download</p></Link>
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

            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
