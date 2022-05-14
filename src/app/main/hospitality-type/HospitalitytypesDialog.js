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

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeHospitalitytype,
  updateHospitalitytype,
  addHospitalitytype,
  closeNewHospitalitytypeDialog,
  closeEditHospitalitytypeDialog,
} from './store/hospitalitytypesSlice';

const defaultValues = {
  id: '',
  hos_type_name: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function HospitalitytypeDialog(props) {
  const dispatch = useDispatch();
  const hospitalitytypeDialog = useSelector(
    ({ hospitalitytypesApp }) => hospitalitytypesApp.hospitalitytypes.hospitalitytypeDialog
  );
  const user = useSelector(({ auth }) => auth.user);

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
    if (hospitalitytypeDialog.type === 'edit' && hospitalitytypeDialog.data) {
      reset({ ...hospitalitytypeDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (hospitalitytypeDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...hospitalitytypeDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [hospitalitytypeDialog.data, hospitalitytypeDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (hospitalitytypeDialog.props.open) {
      initDialog();
    }
    // axios.get(`http://localhost:8000/api/v1/hospitalitytype/get/type`).then((res) => {
    //   console.log('res:', res.detail);
    // });
  }, [hospitalitytypeDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return hospitalitytypeDialog.type === 'edit'
      ? dispatch(closeEditHospitalitytypeDialog())
      : dispatch(closeNewHospitalitytypeDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (hospitalitytypeDialog.type === 'new') {
      dispatch(addHospitalitytype(data));
    } else {
      dispatch(updateHospitalitytype({ ...hospitalitytypeDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeHospitalitytype(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...hospitalitytypeDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {hospitalitytypeDialog.type === 'new' ? 'New Hospitalitytype' : 'Edit Hospitalitytype'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="hospitalitytype avatar" src={avatar} />
          {hospitalitytypeDialog.type === 'edit' && (
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
                  label="Hospitalitytype Id"
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
              name="hos_type_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Hospitalitytype Name"
                  id="hos_type_name"
                  error={!!errors.svc_name}
                  helperText={errors?.svc_name?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {hospitalitytypeDialog.type === 'new' ? (
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
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default HospitalitytypeDialog;
