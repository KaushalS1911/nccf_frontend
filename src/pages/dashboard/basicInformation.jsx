import { Helmet } from 'react-helmet-async';

import BasicInformation from 'src/sections/basicInformation/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Basic Information</title>
      </Helmet>

      <BasicInformation />
    </>
  );
}
