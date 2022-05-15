import * as React from 'react';
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
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import { getCategories, selectCategories } from './store/categoriesSlice';
import { getUsers, selectUsers } from './store/usersSlice';
import { getCustomers, selectCustomers } from './store/customersSlice';
import { convertDateString } from '../../Utils';

import {
  removeCustomerService,
  updateCustomerService,
  addCustomerService,
  closeNewCustomerServiceDialog,
  closeEditCustomerServiceDialog,
} from './store/customerServicesSlice';

const defaultValues = {
  id: '',
  customer_id: '',
  svc_id: '',
  user_id: '',
  status: '',
  start_date: '',
  end_date: '',
};

const statusTypes = {
  ContactUser: 'Contact User',
  HospitalitySubmitted: 'Hospitality Submitted',
  Completed: 'Completed',
  Cancel: 'Cancel',
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function CustomerServiceDialog(props) {
  const dispatch = useDispatch();
  const customerServiceDialog = useSelector(
    ({ customerServicesApp }) => customerServicesApp.customerServices.customerServiceDialog
  );
  const user = useSelector(({ auth }) => auth.user);
  const categories = useSelector(selectCategories);
  const users = useSelector(selectUsers);
  const customers = useSelector(selectCustomers);
  const [dateValue, setDateValue] = React.useState([null, null]);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (customerServiceDialog.type === 'edit' && customerServiceDialog.data) {
      reset({ ...customerServiceDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (customerServiceDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...customerServiceDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [customerServiceDialog.data, customerServiceDialog.type, reset]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getCustomers());
  }, [dispatch]);
  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (customerServiceDialog.props.open) {
      initDialog();
    }
  }, [customerServiceDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return customerServiceDialog.type === 'edit'
      ? dispatch(closeEditCustomerServiceDialog())
      : dispatch(closeNewCustomerServiceDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    data.start_date = convertDateString(dateValue[0]);
    data.end_date = convertDateString(dateValue[1]);
    if (customerServiceDialog.type === 'new') {
      dispatch(addCustomerService(data));
    } else {
      dispatch(updateCustomerService({ ...customerServiceDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeCustomerService(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...customerServiceDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {customerServiceDialog.type === 'new' ? 'New CustomerService' : 'Edit CustomerService'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="customerService avatar" src={avatar} />
          {customerServiceDialog.type === 'edit' && (
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
        encType="multipart/form-data"
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
                  label="CustomerService Id"
                  id="id"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </div>

          {customerServiceDialog.type === 'new' ? (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">star</Icon>
              </div>
              <Controller
                control={control}
                name="customer_id"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    {...value}
                    select
                    className="mb-24"
                    label="Customer Name"
                    id="customer_id"
                    variant="outlined"
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue.props.value);
                    }}
                    fullWidth
                    required
                  >
                    {customers.map((option) => (
                      <MenuItem value={option.id} key={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="svc_id"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Service Name"
                  id="svc_id"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {categories.map((category) => (
                    <MenuItem value={category.id} key={category.svc_name}>
                      {category.svc_name}
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
              name="user_id"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Responsible person"
                  id="user_id"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {users.map((option) => (
                    <MenuItem value={option.id} key={`${option.displayName}`}>
                      {option.displayName}
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
              name="status"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Status"
                  id="status"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {Object.keys(statusTypes).map((key, newvalue) => (
                    <MenuItem key={key} value={statusTypes[key]}>
                      {statusTypes[key]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          <div className="flex">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Start Date"
                endText="End Date"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>

        {customerServiceDialog.type === 'new' ? (
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
                // disabled={_.isEmpty(dirtyFields) || !isValid}
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

export default CustomerServiceDialog;
