import { Helmet } from 'react-helmet-async';
import OrderNewForm from 'src/components/customComponent/newOrderForm/Order-new-form';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Place Order</title>
      </Helmet>

      <OrderNewForm />
    </>
  );
}
