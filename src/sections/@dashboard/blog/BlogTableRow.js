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

BlogTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function BlogTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  // const { name, avatarUrl, company, role, isVerified, status } = row;
  const { post_author, post_title, category, post_name, status, post_date } = row;

  console.log('ROW', row)

  const link = post_name

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
          {post_author.first_name} {post_author.last_name}
        </Typography>
      </TableCell>

      <TableCell align="left">{post_title}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {category !== null && category.name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {post_date}
      </TableCell>

      {/* <TableCell align="center">
        <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        />
        {link}
      </TableCell> */}

      {/* <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === '0' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {(status === '0' && 'Draft') || 'Published'}
        </Label>
      </TableCell> */}

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
                  console.log('ROW', row)
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
