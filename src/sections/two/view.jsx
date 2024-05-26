import React, { useCallback, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import uploadImg from '../../assets/images/uploadDocImg/upload.jpg';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider'; // Adjust the import path as needed
import axios from 'axios';
// import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------
export default function TwoView() {
  const settings = useSettingsContext();
  const [files, setFiles] = useState([]);
  const notify = () => toast.success('Order created');
  const notifyError = () => toast.error('Order not created');

  const defaultValues = useMemo(
    () => ({
      doc_type: '',
      vendor_code: '',
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
    control,
    // formState: { isSubmitting },
  } = methods;
  // const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('doc_type', data.doc_type);
    formData.append('vendor_code', data.vendor_code);
    files.forEach((file) => {
      formData.append('file', file);
    });
    try {
      const response = await axios.post(
        'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/upload_document',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.status == '201') {
        notify();
      } else {
        notifyError();
      }
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
  const docTypeOption = [
    { label: 'Aadhar', key: 'aadhar' },
    { label: 'Certificates', key: 'certificates' },
    { label: 'Gst Number', key: 'gst_number' },
    { label: 'Milling Unit Photo', key: 'milling_unit_photo' },
    { label: 'Milling Unit Video', key: 'milling_unit_video' },
    { label: 'Pan Number', key: 'pan_number' },
  ];
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,application/pdf',
  });
  const renderDetails = (
    <>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Details
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: '20px' }}>
        Title, short description, image...
      </Typography>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <Controller
                name="doc_type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Document Type</InputLabel>
                    <Select {...field} label="Document Type">
                      {docTypeOption.map((option) => (
                        <MenuItem key={option} value={option.key}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {/* <RHFAutocomplete
                name="doc_type"
                type="doc_type"
                label="Document Type"
                placeholder="Choose Document Type"
                fullWidth
                options={docTypeOption.map((option) => option)}
                getOptionLabel={(option) => option}
              /> */}
              <RHFTextField name="vendor_code" label="Vendor Code" />
            </Box>
            <Typography variant="subtitle2">Upload Your Document</Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #CCCCCC',
                borderRadius: '5px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} name="file" />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ width: '500px' }}>
                  <img src={uploadImg} alt={uploadImg} />
                </Typography>
              </Box>
              <List>
                {files.map((file) => (
                  <ListItem
                    sx={{ mt: '10px' }}
                    key={file.name}
                    secondaryAction={
                      <Button
                        sx={{
                          border: '2px solid #000',
                          backgroundColor: 'black',
                          color: 'white',
                          '&:hover': {
                            border: '2px solid #000',
                            backgroundColor: 'white',
                            color: 'black',
                          },
                        }}
                        onClick={() => removeFile(file.name)}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                className="button"
                loading={methods.formState.isSubmitting}
                onClick={onSubmit}
              >
                Save
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
  return (
    <>
      <ToastContainer />
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4">Upload Files</Typography>
        <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderDetails}
          </FormProvider>
        </Box>
      </Container>
    </>
  );
}
