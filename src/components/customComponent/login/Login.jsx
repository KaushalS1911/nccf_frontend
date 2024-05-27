import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Container,
  Card,
  CardContent,
  Box,
  Grid,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/images/header/logo1@4x.png';
import NavbarHeader from '../header/Header';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      phone_number: '',
      password: '',
      vendor_category: '',
    },
  });
  const notify = () => toast.success('Login successfully');
  const notifyError = () => toast.error('Invalid Credential');
  const onSubmit = (values) => {
    axios
      .post('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp_login', values)
      .then((response) => {
        if (response.data.status === '200') {
          notify();
          sessionStorage.setItem('vendor', response?.data?.data[0].vendor_code);
          sessionStorage.setItem('phone_number', response?.data?.data[0].phone_number);
          navigate('/dashboard');
        } else {
          notifyError();
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>NCCF csp portal</title>
      </Helmet>
      <NavbarHeader />
      <Container maxWidth="sm">
        <ToastContainer />
        <Box display="flex" justifyContent="center" alignItems="center" height={'100vh'}>
          <Card sx={{ mt: 5 }}>
            <CardContent
              sx={{
                pb: '70px !important',
                pt: '50px !important',
                px: '30px',
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                mb={3}
                sx={{ height: '130px', mb: '60px' }}
              >
                <img src={logo} alt="BootstrapBrain Logo" />
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="phone_number"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Phone Number" fullWidth required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ my: '10px' }}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Password" type="password" fullWidth required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="vendor_category"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel value="miller" control={<Radio />} label="Miller" />
                          <FormControlLabel
                            value="Distributor"
                            control={<Radio />}
                            label="Distributor"
                          />
                          <FormControlLabel
                            value="Miller & Distributor"
                            control={<Radio />}
                            label="Miller & Distributor"
                          />
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox {...register('remember_me')} />}
                      label="Keep me logged in"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth type="submit">
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
export default Login;
