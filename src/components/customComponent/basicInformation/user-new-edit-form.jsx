import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import FormProvider from '../../hook-form';
import RHFTextField from '../../hook-form/rhf-text-field';
import RHFAutocomplete from '../../hook-form/rhf-autocomplete';
// ----------------------------------------------------------------------

export default function UserNewEditForm({ vendorCode, vendorContact }) {
  const [currentUser, setCurrentUser] = useState();
  const notify = () => toast.success('User details updated successfully');
  const notifyError = () => toast.error('Something went wrong');

  useEffect(() => {
    if (vendorContact) {
      axios
        .get(
          `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/csp_detail/${vendorContact}`
        )
        .then((res) => {
          console.log(res);
          setCurrentUser(res?.data?.data[0]);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const defaultValues = {
    address: '',
    commodity: '',
    contact_person: '',
    district: '',
    gst_number: '',
    milling_type: '',
    name: '',
    pan_number: '',
    phone_number: vendorContact,
    pincode: '',
    quantity: '',
    state: '',
    village: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset({
        address: currentUser.address || '',
        commodity: currentUser.commodity || '',
        contact_person: currentUser.contact_person || '',
        district: currentUser.district || '',
        gst_number: currentUser.gst_number || '',
        milling_type: currentUser.milling_type || '',
        name: currentUser.name || '',
        pan_number: currentUser.pan_number || '',
        phone_number: vendorContact,
        pincode: currentUser.pincode || '',
        quantity: currentUser.quantity || '',
        state: currentUser.state || '',
        village: currentUser.village || '',
      });
    }
  }, [currentUser, reset, vendorContact]);

  const milingType = ['Dry', 'Wet', 'Both'];
  const commodity = ['Rice', 'Wheat', 'Oats'];

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      vendor_code: vendorCode,
      mode: 'test',
    };
    axios
      .put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/update_info', payload)
      .then((res) => {
        console.log('Hello I am running', res);
        notify();
      })
      .catch((err) => notifyError());
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ToastContainer />
        <Grid container>
          <Grid item md={4}>
            <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
              <Box
                sx={{
                  mb: '30px',
                  mt: '10px',
                  fontWeight: '600',
                  fontSize: '18px',
                }}
              >
                Basic Information
                <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                  Basic Information Input fields
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={8} xs={12} item>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                <RHFTextField name="name" label="Full Name" />
                <RHFAutocomplete
                  name="milling_type"
                  type="milling_type"
                  label="Milling Type"
                  placeholder="Choose Milling Type"
                  fullWidth
                  options={milingType.map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <RHFAutocomplete
                  name="commodity"
                  type="commodity"
                  label="Commodity"
                  placeholder="Choose Commodity"
                  fullWidth
                  options={commodity.map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <RHFTextField name="quantity" label="Quantity" />
                <RHFTextField name="contact_person" label="Contact Person" />
                <RHFTextField name="phone_number" label="Phone Number" />
                <RHFTextField name="pan_number" label="Pan Number" />
                <RHFTextField name="gst_number" label="GST Number" />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: '80px' }}>
          <Grid item md={4}>
            <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
              <Box
                sx={{
                  mb: '30px',
                  mt: '10px',
                  fontWeight: '600',
                  fontSize: '18px',
                }}
              >
                Address of Proposed Rice Mill Premises
                <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                  Basic Information Input fields
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={8} xs={12} item>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                }}
              >
                <Box gridColumn={{ xs: 'span 1', sm: 'span 2', md: 'span 4' }}>
                  <RHFTextField name="address" label="Address" fullWidth />
                </Box>
                <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                  <RHFAutocomplete
                    name="district"
                    type="district"
                    label="District"
                    placeholder="Choose District"
                    fullWidth
                    options={commodity.map((option) => option)}
                    getOptionLabel={(option) => option}
                  />
                </Box>
                <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                  <RHFAutocomplete
                    name="state"
                    type="state"
                    label="State"
                    placeholder="Choose Your State"
                    fullWidth
                    options={commodity.map((option) => option)}
                    getOptionLabel={(option) => option}
                  />
                </Box>
                <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                  <RHFTextField name="pincode" label="Pin Code" fullWidth />
                </Box>
                <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                  <RHFAutocomplete
                    name="village"
                    type="village"
                    label="Village"
                    placeholder="Choose Your Village"
                    fullWidth
                    options={commodity.map((option) => option)}
                    getOptionLabel={(option) => option}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" className="button" loading={isSubmitting}>
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}

UserNewEditForm.propTypes = {
  vendorCode: PropTypes.string.isRequired,
  vendorContact: PropTypes.string.isRequired,
};
``;
