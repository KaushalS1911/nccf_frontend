import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import UserNewEditForm from 'src/components/customComponent/user-new-edit-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------
export default function OneView() {
  const settings = useSettingsContext();
  const [vendorCode, setVendorCode] = useState('');
  const [vendorContact, setVendorContact] = useState('');


  const storedVendorCode = sessionStorage.getItem('vendor');
  const storedVendorContact = sessionStorage.getItem('phone_number');
  useEffect(() => {
    setVendorCode(storedVendorCode || '');
    setVendorContact(storedVendorContact || '');
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Basic Information</Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
        }}
      >
        <UserNewEditForm vendorCode={vendorCode} vendorContact={vendorContact}/>
      </Box>
    </Container>
  );
}
