import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import UserNewEditForm from 'src/components/customComponent/user-new-edit-form';
// ----------------------------------------------------------------------
export default function OneView() {
  const settings = useSettingsContext();
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
        <UserNewEditForm />
      </Box>
    </Container>
  );
}
