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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from '@lodash';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import { getHospitalitys, selectHospitalitys } from './store/hospitalitysSlice';
import { convertDateString } from '../../Utils';

import {
  removeCustomerBooking,
  updateCustomerBooking,
  addCustomerBooking,
  closeNewCustomerBookingDialog,
  closeEditCustomerBookingDialog,
} from './store/customerBookingsSlice';
import { getCustomerServices, selectCustomerServices } from './store/customerServiceSlice';

const defaultValues = {
  id: '',
  cus_svc_id: '',
  hos_id: '',
  start_date: '',
  end_date: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function CustomerBookingDialog(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const customerBookingDialog = useSelector(
    ({ customerBookingsApp }) => customerBookingsApp.customerBookings.customerBookingDialog
  );
  const user = useSelector(({ auth }) => auth.user);
  const hospitalitys = useSelector(selectHospitalitys);
  const customerServices = useSelector(selectCustomerServices);
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
  const startDate = watch('start_date');
  const endDate = watch('end_date');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (customerBookingDialog.type === 'edit' && customerBookingDialog.data) {
      reset({ ...customerBookingDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (customerBookingDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...customerBookingDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [customerBookingDialog.data, customerBookingDialog.type, reset]);

  useEffect(() => {
    dispatch(getHospitalitys());
    dispatch(getCustomerServices());
  }, [dispatch]);
  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (customerBookingDialog.props.open) {
      initDialog();
    }
  }, [customerBookingDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return customerBookingDialog.type === 'edit'
      ? dispatch(closeEditCustomerBookingDialog())
      : dispatch(closeNewCustomerBookingDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    data.start_date = convertDateString(dateValue[0]);
    data.end_date = convertDateString(dateValue[1]);

    if (data.cus_svc_id === '') {
      data.cus_svc_id = routeParams.id;
    }
    if (customerBookingDialog.type === 'new') {
      dispatch(addCustomerBooking(data));
    } else {
      dispatch(updateCustomerBooking({ ...customerBookingDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeCustomerBooking(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...customerBookingDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {customerBookingDialog.type === 'new' ? 'New CustomerBooking' : 'Edit CustomerBooking'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="customerBooking avatar" src={avatar} />
          {customerBookingDialog.type === 'edit' && (
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
                  label="CustomerBooking Id"
                  id="id"
                  variant="outlined"
                  fullWidth
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
              name="cus_svc_id"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Customer Service Id"
                  id="cus_svc_id"
                  variant="outlined"
                  value={routeParams.id === 'all' ? value : routeParams.id}
                  disabled={routeParams.id !== 'all'}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {customerServices.map((option) => (
                    <MenuItem value={option.id} key={option.customer_name}>
                      {option.id} {option.customer_name} {option.customer_phone_number}
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
              name="hos_id"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Hospitality Name"
                  id="hos_id"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {hospitalitys.map((option) => (
                    <MenuItem value={option.id} key={option.hos_name}>
                      {option.hos_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          {/* <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Helper text example"
                value={startDateValue}
                onChange={(newValue) => {
                  setStartDateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={params?.inputProps?.placeholder} />
                )}
              />
            </LocalizationProvider>
          </div> */}

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

        {customerBookingDialog.type === 'new' ? (
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
                // disabled={_.isEmpty(dirtyFields)}
              >
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default CustomerBookingDialog;
