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
  setHospitalitysUnstarred,
  setHospitalitysStarred,
  removeHospitalitys,
} from './store/hospitalitysSlice';

function HospitalitysMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedHospitalityIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedHospitalityMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedHospitalitysMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedHospitalitysMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedHospitalityMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedHospitalitysMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedHospitalitysMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeHospitalitys(selectedHospitalityIds));
              closeSelectedHospitalitysMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setHospitalitysStarred(selectedHospitalityIds));
              closeSelectedHospitalitysMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setHospitalitysUnstarred(selectedHospitalityIds));
              closeSelectedHospitalitysMenu();
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

export default HospitalitysMultiSelectMenu;
