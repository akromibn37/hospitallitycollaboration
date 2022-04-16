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
import Divider from '@mui/material/Divider';
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
  username: '',
  password: '',
  usertype: 'user',
  displayName: '',
  title_name: '',
  name: '',
  surname: '',
  date_of_birth: '',
  identifier: '',
  phone_number: '',
  email: '',
  addr: '',
  sub_district: '',
  district: '',
  province: '',
  postal_code: '',
  father_name: '',
  mother_name: '',
  father_birth_date: '',
  mother_birth_date: '',
  living_status: '',
  father_occupation: '',
  mother_occupation: '',
  house_hold_income: '',
  createBy: '',
  updateBy: '',
};

const userTypes = { admin: 'admin', staff: 'staff', user: 'user' };
const childrenTypes = { children: true, notchildren: false };
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  // username: yup.string().required('You must enter a username'),
  // password: yup.string().required('You must enter a password'),
  // displayName: yup.string().required('You must enter a displayName'),
});

function UserDialog(props) {
  const dispatch = useDispatch();
  const userDialog = useSelector(({ usersApp }) => usersApp.users.userDialog);

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
    console.log('data:', data);
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
          {userDialog.type === 'new' ? (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">star</Icon>
                </div>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Username"
                      id="userid"
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
                  name="password"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Password"
                      id="password"
                      variant="outlined"
                      fullWidth
                      type="password"
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
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      {...value}
                      select
                      className="mb-24"
                      label="usertype"
                      id="usertype"
                      variant="outlined"
                      value={value}
                      onChange={(event, newValue) => {
                        console.log('onchange newValue:', newValue.props.value);
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
                      {/* {console.log(usertype.value)} */}
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
                  name="displayName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Display Name"
                      id="displayName"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                />
              </div>

              <Divider />
              <br />
            </>
          ) : (
            <>
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
                      disabled
                    />
                  )}
                />
              </div>
            </>
          )}

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Name"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <Controller
              control={control}
              name="surname"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Last name"
                  id="surname"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone"
                  id="phone_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="birthday"
                  label="Birthday"
                  type="date"
                  defaultValue="2010-01-01"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Identifier"
                  id="identifier"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="addr"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Address"
                  id="address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="sub_district"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="SubDistrict"
                  id="subdistrict"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="district"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="District"
                  id="district"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="province"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Province"
                  id="province"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="postal_code"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Postal Code"
                  id="postalcode"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {userDialog.type === 'new' ? (
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
        ) : (
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
        )}
      </form>
    </Dialog>
  );
}

export default UserDialog;
