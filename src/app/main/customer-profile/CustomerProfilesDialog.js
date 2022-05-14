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
import _ from '@lodash';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { getCategories, selectCategories } from './store/categoriesSlice';

import {
  removeCustomerProfile,
  updateCustomerProfile,
  addCustomerProfile,
  closeNewCustomerProfileDialog,
  closeEditCustomerProfileDialog,
} from './store/customerProfilesSlice';

const defaultValues = {
  id: '',
  name: '',
  line_id: '',
  phone_number: '',
  nationality: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});
const nationality = [
  'Afghan',
  'Albanian',
  'Algerian',
  'American',
  'Andorran',
  'Angolan',
  'Antiguans',
  'Argentinean',
  'Armenian',
  'Australian',
  'Austrian',
  'Azerbaijani',
  'Bahamian',
  'Bahraini',
  'Bangladeshi',
  'Barbadian',
  'Barbudans',
  'Batswana',
  'Belarusian',
  'Belgian',
  'Belizean',
  'Beninese',
  'Bhutanese',
  'Bolivian',
  'Bosnian',
  'Brazilian',
  'British',
  'Bruneian',
  'Bulgarian',
  'Burkinabe',
  'Burmese',
  'Burundian',
  'Cambodian',
  'Cameroonian',
  'Canadian',
  'Cape Verdean',
  'Central African',
  'Chadian',
  'Chilean',
  'Chinese',
  'Colombian',
  'Comoran',
  'Congolese',
  'Costa Rican',
  'Croatian',
  'Cuban',
  'Cypriot',
  'Czech',
  'Danish',
  'Djibouti',
  'Dominican',
  'Dutch',
  'East Timorese',
  'Ecuadorean',
  'Egyptian',
  'Emirian',
  'Equatorial Guinean',
  'Eritrean',
  'Estonian',
  'Ethiopian',
  'Fijian',
  'Filipino',
  'Finnish',
  'French',
  'Gabonese',
  'Gambian',
  'Georgian',
  'German',
  'Ghanaian',
  'Greek',
  'Grenadian',
  'Guatemalan',
  'Guinea-Bissauan',
  'Guinean',
  'Guyanese',
  'Haitian',
  'Herzegovinian',
  'Honduran',
  'Hungarian',
  'I-Kiribati',
  'Icelander',
  'Indian',
  'Indonesian',
  'Iranian',
  'Iraqi',
  'Irish',
  'Israeli',
  'Italian',
  'Ivorian',
  'Jamaican',
  'Japanese',
  'Jordanian',
  'Kazakhstani',
  'Kenyan',
  'Kittian and Nevisian',
  'Kuwaiti',
  'Kyrgyz',
  'Laotian',
  'Latvian',
  'Lebanese',
  'Liberian',
  'Libyan',
  'Liechtensteiner',
  'Lithuanian',
  'Luxembourger',
  'Macedonian',
  'Malagasy',
  'Malawian',
  'Malaysian',
  'Maldivan',
  'Malian',
  'Maltese',
  'Marshallese',
  'Mauritanian',
  'Mauritian',
  'Mexican',
  'Micronesian',
  'Moldovan',
  'Monacan',
  'Mongolian',
  'Moroccan',
  'Mosotho',
  'Motswana',
  'Mozambican',
  'Namibian',
  'Nauruan',
  'Nepalese',
  'New Zealander',
  'Nicaraguan',
  'Nigerian',
  'Nigerien',
  'North Korean',
  'Northern Irish',
  'Norwegian',
  'Omani',
  'Pakistani',
  'Palauan',
  'Panamanian',
  'Papua New Guinean',
  'Paraguayan',
  'Peruvian',
  'Polish',
  'Portuguese',
  'Qatari',
  'Romanian',
  'Russian',
  'Rwandan',
  'Saint Lucian',
  'Salvadoran',
  'Samoan',
  'San Marinese',
  'Sao Tomean',
  'Saudi',
  'Scottish',
  'Senegalese',
  'Serbian',
  'Seychellois',
  'Sierra Leonean',
  'Singaporean',
  'Slovakian',
  'Slovenian',
  'Solomon Islander',
  'Somali',
  'South African',
  'South Korean',
  'Spanish',
  'Sri Lankan',
  'Sudanese',
  'Surinamer',
  'Swazi',
  'Swedish',
  'Swiss',
  'Syrian',
  'Taiwanese',
  'Tajik',
  'Tanzanian',
  'Thai',
  'Togolese',
  'Tongan',
  'Trinidadian or Tobagonian',
  'Tunisian',
  'Turkish',
  'Tuvaluan',
  'Ugandan',
  'Ukrainian',
  'Uruguayan',
  'Uzbekistani',
  'Venezuelan',
  'Vietnamese',
  'Welsh',
  'Yemenite',
  'Zambian',
  'Zimbabwean',
];

function CustomerProfileDialog(props) {
  const dispatch = useDispatch();
  const customerProfileDialog = useSelector(
    ({ customerProfilesApp }) => customerProfilesApp.customerProfiles.customerProfileDialog
  );
  const user = useSelector(({ auth }) => auth.user);
  const categories = useSelector(selectCategories);

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
    if (customerProfileDialog.type === 'edit' && customerProfileDialog.data) {
      reset({ ...customerProfileDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (customerProfileDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...customerProfileDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [customerProfileDialog.data, customerProfileDialog.type, reset]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (customerProfileDialog.props.open) {
      initDialog();
    }
    // axios.get(`http://localhost:8000/api/v1/customerProfile/get/type`).then((res) => {
    //   console.log('res:', res.detail);
    // });
  }, [customerProfileDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return customerProfileDialog.type === 'edit'
      ? dispatch(closeEditCustomerProfileDialog())
      : dispatch(closeNewCustomerProfileDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (customerProfileDialog.type === 'new') {
      dispatch(addCustomerProfile(data));
    } else {
      dispatch(updateCustomerProfile({ ...customerProfileDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeCustomerProfile(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...customerProfileDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {customerProfileDialog.type === 'new' ? 'New CustomerProfile' : 'Edit CustomerProfile'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="customerProfile avatar" src={avatar} />
          {customerProfileDialog.type === 'edit' && (
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
                  label="CustomerProfile Id"
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
              name="line_id"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Line ID"
                  id="line_id"
                  error={!!errors.line_id}
                  helperText={errors?.line_id?.message}
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
              name="phone_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone Number"
                  id="phone_number"
                  error={!!errors.phone_number}
                  helperText={errors?.phone_number?.message}
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
              name="nationality"
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...value}
                  select
                  className="mb-24"
                  label="Nationality"
                  id="nationality"
                  variant="outlined"
                  value={value}
                  onChange={(event, newValue) => {
                    console.log('onchange newValue:', newValue.props.value);
                    onChange(newValue.props.value);
                  }}
                  fullWidth
                  required
                >
                  {nationality.map((national) => (
                    <MenuItem value={national} key={national}>
                      {national}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          {customerProfileDialog.type === 'new' ? (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_circle</Icon>
              </div>
              <Controller
                control={control}
                name="svc_id"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    {...value}
                    select
                    className="mb-24"
                    label="Interested Service"
                    id="svc_id"
                    variant="outlined"
                    value={value}
                    onChange={(event, newValue) => {
                      console.log('onchange newValue:', newValue.props.value);
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
          ) : (
            <></>
          )}
        </DialogContent>

        {customerProfileDialog.type === 'new' ? (
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

export default CustomerProfileDialog;
