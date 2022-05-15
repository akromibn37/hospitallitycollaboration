import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
// import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeUser,
  updateUser,
  addUser,
  closeNewUserDialog,
  closeEditUserDialog,
} from './store/usersSlice';

const defaultValues = {
  id: '',
  displayName: '',
  usertype: 'user',
  active: '',
};

const userTypes = { admin: 'admin', staff: 'staff', user: 'user' };
const activeTypes = { active: 'active', inactive: 'inactive' };
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  // name: yup.string().required('You must enter a name'),
  // username: yup.string().required('You must enter a username'),
  // password: yup.string().required('You must enter a password'),
  // displayName: yup.string().required('You must enter a displayName'),
});

function UserDialog(props) {
  const dispatch = useDispatch();
  const userDialog = useSelector(({ usersPermission }) => usersPermission.users.userDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');
  const [selectedUsertype, setSelectedUsertype] = useState('user');
  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (userDialog.type === 'edit' && userDialog.data) {
      reset({ ...userDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (userDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...userDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [userDialog.data, userDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (userDialog.props.open) {
      initDialog();
    }
  }, [userDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return userDialog.type === 'edit'
      ? dispatch(closeEditUserDialog())
      : dispatch(closeNewUserDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (data.active === 'active') {
      data.active = true;
    } else {
      data.active = false;
    }

    if (userDialog.type === 'new') {
      dispatch(addUser(data));
    } else {
      dispatch(updateUser({ ...userDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  // function onUserTypeChange(event) {
  //   console.log('now event:', event);
  //   setUserType(event.target.value);
  //   console.log('now userType:');
  // }
  const handleUserTypeChange = (ev) => {
    setSelectedUsertype(ev.target.value);
  };

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeUser(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...userDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {userDialog.type === 'new' ? 'New User' : 'Edit User'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="user avatar" src={avatar} />
          {userDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="id"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="UserId"
                  id="userid"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                />
              )}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="displayName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="DisplayName"
                  id="displayName"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="usertype"
              defaultValue={userTypes[control._formValues.userType]}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="User Type"
                  id="usertype"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {Object.keys(userTypes).map((key, newvalue) => (
                    <MenuItem key={key} value={userTypes[key]}>
                      {userTypes[key]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="active"
              defaultValue={
                control._formValues.active === 'active' ? activeTypes.active : activeTypes.inactive
              }
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Active"
                  id="active"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {Object.keys(activeTypes).map((key, newvalue) => (
                    <MenuItem key={key} value={activeTypes[key]}>
                      {activeTypes[key]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </DialogContent>

        {/* {userDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : ( */}
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              // disabled={_.isEmpty(dirtyFields)}
            >
              Save
            </Button>
          </div>
          {/* <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton> */}
        </DialogActions>
        {/* )} */}
      </form>
    </Dialog>
  );
}

export default UserDialog;
