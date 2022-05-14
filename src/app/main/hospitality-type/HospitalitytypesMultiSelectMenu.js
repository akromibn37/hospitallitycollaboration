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
  setHospitalitytypesUnstarred,
  setHospitalitytypesStarred,
  removeHospitalitytypes,
} from './store/hospitalitytypesSlice';

function HospitalitytypesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedHospitalitytypeIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedHospitalitytypeMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedHospitalitytypesMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedHospitalitytypesMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedHospitalitytypeMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedHospitalitytypesMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedHospitalitytypesMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeHospitalitytypes(selectedHospitalitytypeIds));
              closeSelectedHospitalitytypesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setHospitalitytypesStarred(selectedHospitalitytypeIds));
              closeSelectedHospitalitytypesMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setHospitalitytypesUnstarred(selectedHospitalitytypeIds));
              closeSelectedHospitalitytypesMenu();
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

export default HospitalitytypesMultiSelectMenu;
