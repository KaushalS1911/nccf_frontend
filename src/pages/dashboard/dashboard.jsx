import { Helmet } from 'react-helmet-async';
import { OverviewAppView } from 'src/sections/app/view';
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

      <OverviewAppView />
      {/*<FourView />*/}
    </>
  );
}
