import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsersUnstarred, setUsersStarred, removeUsers } from './store/usersSlice';

function UsersMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedUserIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedUserMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedUsersMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedUserMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedUsersMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedUsersMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeUsers(selectedUserIds));
              closeSelectedUsersMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setUsersStarred(selectedUserIds));
              closeSelectedUsersMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setUsersUnstarred(selectedUserIds));
              closeSelectedUsersMenu();
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

export default UsersMultiSelectMenu;
