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
  setCustomerProfilesUnstarred,
  setCustomerProfilesStarred,
  removeCustomerProfiles,
} from './store/customerProfilesSlice';

function CustomerProfilesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedCustomerProfileIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedCustomerProfileMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedCustomerProfilesMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedCustomerProfilesMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedCustomerProfileMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedCustomerProfilesMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedCustomerProfilesMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeCustomerProfiles(selectedCustomerProfileIds));
              closeSelectedCustomerProfilesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerProfilesStarred(selectedCustomerProfileIds));
              closeSelectedCustomerProfilesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setCustomerProfilesUnstarred(selectedCustomerProfileIds));
              closeSelectedCustomerProfilesMenu();
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

export default CustomerProfilesMultiSelectMenu;
