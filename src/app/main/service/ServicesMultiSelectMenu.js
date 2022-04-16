import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setServicesUnstarred, setServicesStarred, removeServices } from './store/servicesSlice';

function ServicesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedServiceIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedServiceMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedServicesMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedServicesMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedServiceMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedServicesMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedServicesMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeServices(selectedServiceIds));
              closeSelectedServicesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setServicesStarred(selectedServiceIds));
              closeSelectedServicesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setServicesUnstarred(selectedServiceIds));
              closeSelectedServicesMenu();
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

export default ServicesMultiSelectMenu;
