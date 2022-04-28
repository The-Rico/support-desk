import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import latte from '../assets/images/latte.png';
import mocha from '../assets/images/mocha.png';
import espresso from '../assets/images/espresso.png';
import cappuccino from '../assets/images/cappuccino.png';
import small from '../assets/images/small.png';
import medium from '../assets/images/medium.png';
import large from '../assets/images/large.png';
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('Mocha');
  const [size, setSize] = useState('s');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Order</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='Mocha'>Mocha</option>
              <option value='Latte'>Latte</option>
              <option value='Espresso'>Espresso</option>
              <option value='Cappuccino'>Cappuccino</option>
            </select>
            <label htmlFor='size'>Size</label>
            <select
              name='size'
              id='size'
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value='s'>Small</option>
              <option value='m'>Medium</option>
              <option value='l'>Large</option>
            </select>
            <div>
              {product === 'Mocha' ? (
                <img className='coffeeImages' src={mocha}></img>
              ) : product === 'Latte' ? (
                <img className='coffeeImages' src={latte}></img>
              ) : product === 'Cappuccino' ? (
                <img className='coffeeImages' src={cappuccino}></img>
              ) : (
                <img className='coffeeImages' src={espresso}></img>
              )}
              {size === 's' ? (
                <img className='cupImages' src={small}></img>
              ) : size === 'm' ? (
                <img className='cupImages' src={medium}></img>
              ) : (
                <img className='cupImages' src={large}></img>
              )}
            </div>
            <h1 className='text-xl underline'>Hello world!</h1>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Special requests:</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
