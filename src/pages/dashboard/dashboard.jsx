import { Helmet } from 'react-helmet-async';
// import OrderNewForm from 'src/components/customComponent/Order-new-form';

import FourView from 'src/sections/four/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      {/* <OrderNewForm /> */}

      <h2>Dashboard</h2>
      {/*<FourView />*/}
    </>
  );
}
