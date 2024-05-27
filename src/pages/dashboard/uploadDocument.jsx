import { Helmet } from 'react-helmet-async';

import UploadDocument from 'src/sections/uploadDocument/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Upload Documents</title>
      </Helmet>

      <UploadDocument />
    </>
  );
}
