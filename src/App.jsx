
import './App.css';
import Home from './screens/home/Home';
import { Routes, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Signup from './screens/signup/Signup'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import Profile from './screens/profile/Profile';
import PreviousBooking from './screens/previousBookings/PreviousBooking';
import PaymentMethod from './screens/paymentMethod/PaymentMethod';
import BookRide from './screens/bookRide/BookRide';
import Post from './screens/post/Post';
import Admin from './screens/admin/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/bookinghistory' element={<PreviousBooking />} />
          <Route path='/payment' element={<PaymentMethod />} />
          <Route path='/bookride' element={<BookRide />} />
          <Route path='/post' element={<Post />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<h1 style={{ textAlign: 'center', marginTop: '20px' }}>Error 404 Page Not Found </h1>} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
