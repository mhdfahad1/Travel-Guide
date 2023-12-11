import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { loginContext } from '../context/ContextShare';


function Header({ isAgency }) {
  const { loggined, setLoggined } = useContext(loginContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.token && sessionStorage.Role === "User") {
      setLoggined(true)
    }
  }, [])

  const Logout = (e) => {
    e.preventDefault()
    navigate('/login')

    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("Role")
    sessionStorage.removeItem("token")
    setLoggined(false)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu className=''
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={(e) => Logout(e)}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu className=''
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>

        <Link to={'/wishlist'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'><i className="fa-solid fa-heart" ></i> WishList</Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >

        </IconButton>
        <Link to={'/bookings'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'>Bookings</Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >

        </IconButton>
        <Link to={'/allPackages'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'>Packages</Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >

        </IconButton>
        {loggined ? <div className=''>
          <Link onClick={(e) => Logout(e)} style={{ fontFamily: 'Poppins, sans-serif' }} className='btn btn-dark rounded-3xl w-[100px]'>Logout</Link>
        </div> :
          <Dropdown>
            <Dropdown.Toggle className='bg-blue-700' >
              Login
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item ><Link to={'/login'}>User Login</Link></Dropdown.Item>
              <Dropdown.Item ><Link to={'/agencyLogin'}>Agency Login</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }      </MenuItem>

    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className='fixed shadow' position="static" color=''>
          <Toolbar>

            <Link to={'/'}><img width={'120px'} height={'20px'} src={logo} alt="" />
            </Link>

            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Box className='ml-[600px]' sx={{ display: { xs: 'none', md: 'flex' } }}>

              <div className='flex mt-4'>
                {isAgency ? "" : <div className=''>
                  <Link to={'/wishlist'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'><i className="fa-solid fa-heart" ></i> WishList</Link>
                </div>}
                {isAgency ? "" : <div className='ml-6'>
                  <Link to={'/bookings'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'>Bookings</Link>
                </div>}

                {isAgency ? "" : <div className='ml-6'>
                  <Link to={'/allPackages'} style={{ fontFamily: 'Poppins, sans-serif' }} className='text-base font-bold'>Packages</Link>
                </div>}
                <div className='ml-20 flex '>
                  {loggined ? <div className='pb-3'>
                    <Link onClick={(e) => Logout(e)} style={{ fontFamily: 'Poppins, sans-serif' }} className='btn btn-dark rounded-3xl w-[100px]'>Logout</Link>
                  </div> :
                    <Dropdown className='pb-2'>
                      <Dropdown.Toggle className='bg-blue-700' >
                        Login
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1"><Link to={'/login'}>User Login</Link></Dropdown.Item>
                        <Dropdown.Item href="#/action-2"><Link to={'/agencyLogin'}>Agency Login</Link></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  }

                </div>
              </div>




            </Box>


            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <hr className='mt-2' />

    </div>
  )
}

export default Header