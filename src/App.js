import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Packages from './Pages/Packages';
import Details from './Pages/Details';
import AddPackages from './Pages/AddPackages';
import AgencyLogin from './Pages/AgencyLogin';
import AgencyRegister from './Pages/AgencyRegister';
import Wishlist from './Pages/Wishlist';
import Bookings from './Pages/Bookings';
import Allpackages from './Pages/Allpackages';
import { useContext } from 'react';
import { adminLogincontext, loginContext } from './context/ContextShare';

function App() {
  const {loggined,setLoggined}=useContext(loginContext)
  console.log(loggined);
  const {adminLoggin,setAdminloggin}=useContext(adminLogincontext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/packages/:_id' element={<Packages />}></Route>
        <Route path='/details/:id/:_id' element={<Details />}></Route>
        <Route path='/admin' element={adminLoggin?<AddPackages />:<Home/>}></Route>
        <Route path='/agencyLogin' element={<AgencyLogin />}></Route>
        <Route path='/agencyRegister' element={<AgencyRegister />}></Route>
        <Route path='/wishlist' element={loggined?<Wishlist />:<Home/>}></Route>
        <Route path='/bookings' element={loggined?<Bookings />:<Home/>}></Route>
        <Route path='/allPackages' element={<Allpackages />}></Route>
        <Route path='/*' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
