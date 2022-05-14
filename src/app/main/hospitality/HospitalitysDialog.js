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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import _ from '@lodash';
import * as yup from 'yup';
import { getHospitalityTypes, selectHospitalitytypes } from './store/hospitalitySlice';

import {
  removeHospitality,
  updateHospitality,
  addHospitality,
  closeNewHospitalityDialog,
  closeEditHospitalityDialog,
} from './store/hospitalitysSlice';

const defaultValues = {
  id: '',
  hos_name: '',
  hos_desc: '',
  hos_type: '',
  hos_contact_name: '',
  hos_phone_number: '',
};

// const hosTypes = { Hospital: 'HOSPITAL', Hotel: 'HOTEL' };

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function HospitalityDialog(props) {
  const dispatch = useDispatch();
  const hospitalityDialog = useSelector(
    ({ hospitalitysApp }) => hospitalitysApp.hospitalitys.hospitalityDialog
  );
  const user = useSelector(({ auth }) => auth.user);
  const hosTypes = useSelector(selectHospitalitytypes);
  console.log('hosTypes:', hosTypes);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  useEffect(() => {
    dispatch(getHospitalityTypes());
  }, [dispatch]);

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (hospitalityDialog.type === 'edit' && hospitalityDialog.data) {
      reset({ ...hospitalityDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (hospitalityDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...hospitalityDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [hospitalityDialog.data, hospitalityDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (hospitalityDialog.props.open) {
      initDialog();
    }
  }, [hospitalityDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return hospitalityDialog.type === 'edit'
      ? dispatch(closeEditHospitalityDialog())
      : dispatch(closeNewHospitalityDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (hospitalityDialog.type === 'new') {
      dispatch(addHospitality(data));
    } else {
      dispatch(updateHospitality({ ...hospitalityDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeHospitality(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...hospitalityDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {hospitalityDialog.type === 'new' ? 'New Hospitality' : 'Edit Hospitality'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="hospitality avatar" src={avatar} />
          {hospitalityDialog.type === 'edit' && (
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
                  label="Hospitality Id"
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
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="hos_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Hospitality Name"
                  id="hos_name"
                  error={!!errors.hos_name}
                  helperText={errors?.hos_name?.message}
                  variant="outlined"
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
              name="hos_desc"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Hospitality Description"
                  id="hos_desc"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  fullWidth
                  multiline
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
              name="hos_contact_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Hospitality Contact Name"
                  id="hos_contact_name"
                  error={!!errors.hos_contact_name}
                  helperText={errors?.hos_contact_name?.message}
                  variant="outlined"
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
              name="hos_phone_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Hospitality Phone Number"
                  id="hos_phone_number"
                  error={!!errors.hos_phone_number}
                  helperText={errors?.hos_phone_number?.message}
                  variant="outlined"
                  fullWidth
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
              name="hos_type"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Hospitality Type"
                  id="hos_type"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    console.log('onchange newValue:', newValue.props.value);
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {hosTypes.map((hostype) => (
                    <MenuItem value={hostype.hos_type_name} key={hostype.hos_type_name}>
                      {hostype.hos_type_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </DialogContent>

        {hospitalityDialog.type === 'new' ? (
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

export default HospitalityDialog;
