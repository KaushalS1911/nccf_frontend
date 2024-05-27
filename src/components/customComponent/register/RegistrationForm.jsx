import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const RegistrationForm = ({ vendor_category }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      address: '',
      commodity: '',
      contact_person: '',
      district: '',
      gst_number: '',
      milling_type: '',
      name: '',
      pan_number: '',
      phone_number: '',
      pincode: '',
      quantity: '',
      state: '',
    },
  });

  const onSubmit = (values) => {
    const payload = {
      ...values,
      vendor_category,
      mode: 'test',
    };
    axios
      .post(
        'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/channel_sales_partner',
        payload
      )
      .then((res) => {
        alert('Registered Successfully...');
        console.log('Registered Successfully...');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={5} className="registerForm" sx={{ backgroundColor: 'white' ,borderRadius:"10px"}}>
      <Typography variant="h5" gutterBottom className="heading">
        Basic Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Name" required fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="milling_type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel required>Milling type</InputLabel>
                  <Select {...field} label="Milling type">
                    <MenuItem value="">---Select Milling Type---</MenuItem>
                    <MenuItem value="dry">Dry</MenuItem>
                    <MenuItem value="wet">Wet</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="commodity"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel required>Commodity</InputLabel>
                  <Select {...field} label="Commodity">
                    <MenuItem value="">---Select Commodity Type---</MenuItem>
                    <MenuItem value="rice">Rice</MenuItem>
                    <MenuItem value="wheat">Wheat</MenuItem>
                    <MenuItem value="oats">Oats</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => <TextField {...field} label="Quantity" required fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="contact_person"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Contact Person" required fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Phone Number" required fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="pan_number"
              control={control}
              render={({ field }) => <TextField {...field} label="Pan No." required fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="gst_number"
              control={control}
              render={({ field }) => <TextField {...field} label="GST No." required fullWidth />}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom className="heading" mt={2}>
          Address of Proposed Rice Mill Premises
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <TextField {...field} label="Address" required fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel required>District</InputLabel>
                  <Select {...field} label="District">
                    <MenuItem value="">---Select District---</MenuItem>
                    <MenuItem value="bhavnagar">Bhavnagar</MenuItem>
                    <MenuItem value="amareli">Amareli</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel required>State</InputLabel>
                  <Select {...field} label="State">
                    <MenuItem value="">---Select State---</MenuItem>
                    <MenuItem value="surat">Surat</MenuItem>
                    <MenuItem value="ahemdabad">Ahemdabad</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => <TextField {...field} label="Pin Code" required fullWidth />}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            SUBMIT
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegistrationForm;
