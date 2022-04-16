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
  setCustomerServicesUnstarred,
  setCustomerServicesStarred,
  removeCustomerServices,
} from './store/customerServicesSlice';

function CustomerServicesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedCustomerServiceIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedCustomerServiceMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedCustomerServicesMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedCustomerServicesMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedCustomerServiceMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedCustomerServicesMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedCustomerServicesMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeCustomerServices(selectedCustomerServiceIds));
              closeSelectedCustomerServicesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerServicesStarred(selectedCustomerServiceIds));
              closeSelectedCustomerServicesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerServicesUnstarred(selectedCustomerServiceIds));
              closeSelectedCustomerServicesMenu();
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

export default CustomerServicesMultiSelectMenu;
