// import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { paths } from 'src/routes/paths';
// import { fData } from 'src/utils/format-number';
// import { countries } from 'src/assets/data';
// import Label from 'src/components/label';
// import { useSnackbar } from 'src/components/snackbar';
import FormProvider from '../../components/hook-form';
import RHFTextField from '../../components/hook-form/rhf-text-field';
import RHFAutocomplete from '../../components/hook-form/rhf-autocomplete';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------
export default function UserNewEditForm({ vendorCode, vendorContact }) {
  const [currentUser, setCurrentUser] = useState();
  const notify = () => toast.success('User details updated successfully');
  const notifyError = () => toast.error('Something went wrong');

  useEffect(() => {
    if(vendorContact){
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp_detail/${vendorContact}`).then((res) => {
        setCurrentUser(res?.data);
      }).catch((error) => console.log(error));
    }
  },[vendorContact]);

  const defaultValues = useMemo(
    () => ({
      address: currentUser?.address || '',
      commodity: currentUser?.commodity || '',
      contact_person: currentUser?.contact_person || '',
      district: currentUser?.district || '',
      gst_number:currentUser?.gst_number ||  '',
      milling_type: currentUser?.milling_type || '',
      name: currentUser?.name || '',
      pan_number: currentUser?.pan_number || '',
      phone_number: vendorContact,
      pincode: currentUser?.pincode || '',
      quantity:currentUser?.quantity ||  '',
      state: currentUser?.state || '',
    }),
    []
  );

  const methods = useForm({
    defaultValues,
  });

  const milingType = ['Dry', 'Wet', 'Both'];
  const commodity = ['Rice', 'Wheat', 'Oats'];
  const {
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  // const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      vendor_code: vendorCode,
      mode: 'test',
    };
    axios
      .put(
        'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/update_info',
        payload
      )
      .then((res) => {
        console.log("Hello I am running",res)
        notify()
      })
      .catch((err) =>
      notifyError()
      );
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ToastContainer/>
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
                  md: 'repeat(3, 1fr)',
                }}
              >
                <Box gridColumn={{ xs: 'span 1', sm: 'span 2', md: 'span 3' }}>
                  <RHFTextField name="address" label="Address" fullWidth />
                </Box>
                <RHFAutocomplete
                  name="district"
                  type="district"
                  label="District"
                  placeholder="Choose District"
                  fullWidth
                  options={commodity.map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <RHFAutocomplete
                  name="state"
                  type="state"
                  label="State"
                  placeholder="Choose Your State"
                  fullWidth
                  options={commodity.map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <RHFTextField name="pincode" label="Pin Code" fullWidth />
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
  currentUser: PropTypes.object,
};
