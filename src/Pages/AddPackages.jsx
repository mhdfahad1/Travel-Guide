import React, { useContext } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addPackeageAPI, agencyPackageAPI, deletePackageAPI, editPackageAPI, getAgencybookingsAPI } from '../services/allApi';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { adminLogincontext } from '../context/ContextShare';


function AddPackages() {
  const [agencyName, setAgencyname] = useState('')
  console.log(agencyName);
  const { adminLoggin, setAdminloggin } = useContext(adminLogincontext)
  const navigate = useNavigate()
  const [isloggin, setLoggin] = useState(false)

  const [bookings, setBookings] = useState([])
  console.log(bookings.user);

  const user = { custId: JSON.parse(sessionStorage.getItem("existingUser"))._id }

  const [packages, setPackages] = useState([])

  const getPackages = async () => {
    if (sessionStorage.getItem("existingUser") && sessionStorage.Role === "Agency") {
      const result = await agencyPackageAPI(user)
      // console.log(result);
      if (result.status === 200) {
        setPackages(result.data)
      } else {
        toast.error(result.message)
      }
    } else {
      toast.warning('please login')
    }

  }
  const Logout = (e) => {
    e.preventDefault()
    navigate('/agencyLogin')
    setAdminloggin(false)
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("Role")

  }
  const getAgencyboookings = async () => {
    if (sessionStorage.getItem("existingUser") && sessionStorage.Role === "Agency") {
      const result = await getAgencybookingsAPI(user)
      // console.log(result);
      if (result.status === 200) {
        setBookings(result.data)
      } else {
        toast.error(result.response.data)
      }
    } else {
      toast.warning('Please login')
    }

  }
  useEffect(() => {
    if (sessionStorage.getItem("existingUser") && sessionStorage.Role === "Agency") {
      setAgencyname(JSON.parse(sessionStorage.getItem("existingUser")).name)
      setLoggin(true)

      getPackages()
      getAgencyboookings()
    } else {
      toast.warning('Please login')
    }
  }, [packages,bookings])

  const [booking, setBooking] = useState({
    packagename: "", description: "", image: [], foodimage: [], foodDescription: [], stayimage: [], stayDescription: [], activityimages: [], activityDescription: [], placename: "", price: "", custId: user.custId

  })
  // console.log(booking);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setBooking({
      packagename: "", description: "", image: [], foodimage: [], foodDescription: [], stayimage: [], stayDescription: [], activityimages: [], activityDescription: [], placename: "", price: ""

    })
  }
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(booking);

  const handleSubmit = async () => {
    if (booking?._id) {
      const { _id } = booking
      const { packagename, description, image, foodimage, foodDescription, stayimage, stayDescription, activityimages, activityDescription, placename, price, custId } = booking
      if (!_id || !packagename || !description || !image || !foodimage || !foodDescription || !stayimage || !stayDescription || !activityimages || !activityDescription || !placename || !price || !custId) {
        toast.info('please fill the form completely')
      } else {
        const result = await editPackageAPI(booking)
        if (result.status === 200) {
          toast.success(`${booking.packagename} is edited successfully`)
          handleClose()

          getPackages()
          setBooking({
            packagename: "", description: "", image: [], foodimage: [], foodDescription: [], stayimage: [], stayDescription: [], activityimages: [], activityDescription: [], placename: "", price: ""

          })
        } else {
          toast.error(result.response.data)
        }
      }

    } else {
      const { packagename, description, image, foodimage, foodDescription, stayimage, stayDescription, activityimages, activityDescription, placename, price, custId } = booking
      if (!packagename || !description || !image || !foodimage || !foodDescription || !stayimage || !stayDescription || !activityimages || !activityDescription || !placename || !price || !custId) {
        toast.info('please fill the form completely')
      } else {
        const result = await addPackeageAPI(booking)
        // console.log(result);
        if (result.status === 200) {
          toast.success('package added successfully')
          setBooking({
            packagename: "", description: "", image: [], foodimage: [], foodDescription: [], stayimage: [], stayDescription: [], activityimages: [], activityDescription: [], placename: "", price: ""

          })
          getPackages()
          handleClose()
        } else {
          toast.error(result.message)
        }
      }
    }
  }

  const deleteAgencyPackage = async (id) => {
    const result = await deletePackageAPI(id)
    if (result.status === 200) {
      toast.success('Deleted successfully')
      getPackages()

    } else {
      toast.error(result.response.data)
    }
  }
  const editePackage = async (item) => {
    // console.log(item);
    handleShow()
    setBooking(item)
    // console.log(booking);
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              <Box sx={{ width: '100%' }}>
                <Tabs className='md:w-[250px] w-[100px]'
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="one" label=" Packages" />
                  <Tab value="two" label="Bookings" />
                  {/* <Tab value="three" label="Bookings" /> */}
                </Tabs>
              </Box>
            </Typography>
            <Typography variant="h6" component="div">
              <Button variant="dark" onClick={handleShow}>
                Add Package
              </Button>
            </Typography>

            <div className='md:ml-[650px] '>
              {isloggin ? <div className=''>
                <Link onClick={(e) => Logout(e)} style={{ fontFamily: 'Poppins, sans-serif' }} className='btn btn-dark rounded-3xl w-[100px]'>Logout</Link>
              </div> :
                <Dropdown>
                  <Dropdown.Toggle className='bg-blue-700' >
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2"><Link to={'/agencyLogin'}>Agency Login</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }

            </div>
          </Toolbar>
        </AppBar>
      </Box>

      {
        value === 'one' ?
          <div className='row p-20'>
            <h1 className='text-3xl font-bold'>Welcome {agencyName}</h1>
            {packages.length > 0 ?
              packages.map((item) => (
                <div className='col-lg-4'>
                  <Card sx={{ maxWidth: 345 }} className='shadow mr-10 md:mt-0 mt-5 w-100'>
                    <CardHeader

                      action={
                        <div>
                          <button onClick={() => editePackage(item)}><i className="fa-solid fa-pen-to-square text-success text-2xl me-3"></i></button>

                          <button onClick={() => deleteAgencyPackage(item._id)}><i className="fa-solid fa-trash text-danger text-2xl"></i></button>
                        </div>
                      }

                      title={item.packagename}
                      subheader={item.placename}
                    />
                    <CardMedia style={{ height: '250px' }} src={item?.image[0]}
                      component="img"
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.description.slice(0, 80)}...
                      </Typography>
                    </CardContent>
                    <CardActions className='flex justify-between'>
                      <p>From ₹{item.price} per person</p>
                      <Link to={`/details/${user.custId}/${item._id}`} className='btn btn-primary'>Details</Link>

                    </CardActions>


                  </Card>
                </div>
              ))
              :
              <p className='text-center text-2xl'>not available</p>
            }

          </div> :

          <TableContainer className='md:w-[100%] w-[]' component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>

                  <TableCell>Package Name</TableCell>
                  <TableCell align="right">Adults</TableCell>
                  <TableCell align="right">Date From </TableCell>
                  <TableCell align="right">Date to</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">User Phone No:</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length > 0 ?
                  bookings.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" >{index + 1}</TableCell>

                      <TableCell >
                        {row.packagename}
                      </TableCell>
                      <TableCell align="right">{row.adults}</TableCell>
                      <TableCell align="right">{row.datefrom}</TableCell>
                      <TableCell align="right">{row.dateto}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>

                    </TableRow>
                  ))
                  : <p className='text-center text-danger'>No Bookings</p>
                }
              </TableBody>
            </Table>
          </TableContainer>

      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='md'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input onChange={(e) => { setBooking({ ...booking, packagename: e.target.value }) }} value={booking.packagename} type="text" className="form-control m-2 p-2" placeholder="packag name" />
          <input onChange={(e) => { setBooking({ ...booking, description: e.target.value }) }} value={booking.description} type="text" className="form-control m-2 p-2" placeholder="description" />
          <input onChange={(e) => { setBooking({ ...booking, image: e.target.value.split(',') }) }} value={booking.image} type="textarea" className="form-control p-2 m-2" placeholder="package images links seperated by comma" />
          <input onChange={(e) => { setBooking({ ...booking, foodimage: e.target.value.split(',') }) }} value={booking.foodimage} type="text" className="form-control p-2 m-2" placeholder="food images links seperated by comma" />
          <input onChange={(e) => { setBooking({ ...booking, foodDescription: e.target.value.split(',') }) }} value={booking.foodDescription} type="textarea" className="form-control p-2 m-2" placeholder="food descriptions seperated by comma" />

          <input onChange={(e) => { setBooking({ ...booking, stayimage: e.target.value.split(',') }) }} value={booking.stayimage} type="text" className="form-control p-2 m-2" placeholder="stay images links seperated by comma" />
          <input onChange={(e) => { setBooking({ ...booking, stayDescription: e.target.value.split(',') }) }} value={booking.stayDescription} type="textarea" className="form-control p-2 m-2" placeholder="stay descriptions seperated by comma" />

          <input onChange={(e) => { setBooking({ ...booking, activityimages: e.target.value.split(',') }) }} value={booking.activityimages} type="text" className="form-control p-2 m-2" placeholder="activities images links seperated by comma" />
          <input onChange={(e) => { setBooking({ ...booking, activityDescription: e.target.value.split(',') }) }} value={booking.activityDescription} type="textarea" className="form-control p-2 m-2" placeholder="activity descriptions seperated by comma" />

          <input onChange={(e) => { setBooking({ ...booking, placename: e.target.value }) }} value={booking.placename} type="text" className="form-control p-2 m-2" placeholder="place name" />

          <input onChange={(e) => { setBooking({ ...booking, price: e.target.value }) }} type="text" value={booking.price} className="form-control p-2 m-2" placeholder="price" />


        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-light' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn btn-primary bg-sky-700 text-black'>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="colored"
      />
    </>
  )
}

export default AddPackages