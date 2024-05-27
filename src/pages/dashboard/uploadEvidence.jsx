import { Helmet } from 'react-helmet-async';

import UploadEvidence from 'src/sections/uploadEvidence/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Upload Evidence</title>
      </Helmet>

      <UploadEvidence />
    </>
  );
}
