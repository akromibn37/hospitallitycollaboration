import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCustomerBookingsUnstarred,
  setCustomerBookingsStarred,
  removeCustomerBookings,
} from './store/customerBookingsSlice';

function CustomerBookingsMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedCustomerBookingIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedCustomerBookingMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedCustomerBookingsMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedCustomerBookingsMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedCustomerBookingMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedCustomerBookingsMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedCustomerBookingsMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeCustomerBookings(selectedCustomerBookingIds));
              closeSelectedCustomerBookingsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerBookingsStarred(selectedCustomerBookingIds));
              closeSelectedCustomerBookingsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerBookingsUnstarred(selectedCustomerBookingIds));
              closeSelectedCustomerBookingsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star_border</Icon>
            </ListItemIcon>
            <ListItemText primary="Unstarred" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default CustomerBookingsMultiSelectMenu;
