import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Welcome</h1>
        <p>Please submit the customer's order</p>
      </section>
      <div className='homeCenter'>
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> Create New Order
        </Link>

        <Link to='/tickets' className='btn btn-block'>
          <FaTicketAlt /> View Orders
        </Link>
      </div>
    </>
  );
}

export default Home;
