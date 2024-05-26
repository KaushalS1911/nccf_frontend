// import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Container } from '@mui/material';
import FormProvider from '../../components/hook-form';
import RHFTextField from '../../components/hook-form/rhf-text-field';

export default function OrderNewForm() {
  const [vendorCode, setVendorCode] = useState('');
  const notify = () => toast.success('Order created');
  const notifyError = () => toast.error('Order not created');

  const storedVendorCode = sessionStorage.getItem('vendor');
  useEffect(() => {
    setVendorCode(storedVendorCode || '');
  }, []);

  const defaultValues = useMemo(
    () => ({
      vendor_code: vendorCode,
      commodity: '',
      quantity: '',
    }),
    []
  );
  const methods = useForm({
    defaultValues,
  });

  const {
    // reset,
    // watch,
    // setValue,
    handleSubmit,
    // control,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      vendor_code: vendorCode,
      mode: 'test',
      status: '1',
    };
    try {
      const response = await axios.post(
        'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/create_order',
        payload
      );

      if (response.data.status == '400') {
        notify();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
      console.error('Order creation error:', error);
    }
  });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
      <ToastContainer />
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item md={4}>
          <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
            <Box sx={{ mb: '30px', fontWeight: '600', fontSize: '18px' }}>
              Create Order
              <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                Create Order Input fields
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
              <RHFTextField name="vendor_code" label="VendorCode" value={vendorCode} />
              <RHFTextField name="commodity" label="Commodity" />
              <RHFTextField name="quantity" label="Quantity" />
            </Box>
          </Card>
          <Container>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                className="button"
                loading={methods.formState.isSubmitting}
                onClick={onSubmit}
              >
                Order
              </LoadingButton>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

OrderNewForm.propTypes = {
  currentUser: PropTypes.object,
};
