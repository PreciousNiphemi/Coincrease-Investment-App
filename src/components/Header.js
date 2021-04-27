import React, {useState, useEffect} from 'react';
import { makeStyles, AppBar, Toolbar, Hidden, Button, Avatar, Menu, MenuItem, Modal, Fade, Backdrop, Divider } from '@material-ui/core';
import {Link} from 'react-router-dom';
import HeaderMobile from './HeaderMobile'
import StringData from '../context/StringData';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        paddingTop: '20px',
        transition: '.5s'
    },
    appBarScroll: {
        backgroundColor: '#003466',
        boxShadow: 'none',
        transition: '.5s'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 50px',
        height: '80px',
    },
    headerBtn: {
        border: 'none',
        outline: 'none',
        padding: '10px 30px',
        borderRadius: '20px',
        color: 'white',
        backgroundColor: '#002447',
        fontWeight: 'bold',
        transition: '.5s',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#F6CD2D',
            color: 'white'
        }
    },
    toolBarSm: {
        padding: '0px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLink: {
        margin: '0px 20px', 
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        color: 'white',
        transition: '.5s',
        '&:hover': {
            borderBottom: '1px solid #F6CD2D',
            textDecoration: 'none',
            color: '#F6CD2D'
        }
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        position: 'absolute',
        top: '8em',
        right: '8em',
        backgroundColor: 'white',
        padding: '30px 50px',
        borderRadius: '5px'
    },
    menuLink: {
        marginTop: '10px',
        fontWeight: 'bold',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    loanBtn: {
        border: 'none',
        padding: '10px',
        marginRight: '20px',
        borderRadius: '5px',
        fontWeight: 'bold',
        backgroundColor: '#F8B40E',
        color: 'white'
    }
});

function Header() {
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState('appBar');
    const Name = localStorage.getItem(StringData.FirstName);
    const LastName = localStorage.getItem(StringData.LastName);
    const PhotoURL = localStorage.getItem(StringData.PhotoURL);
    const Email = localStorage.getItem(StringData.Email);
    const {currentUser, signOut} = useAuth();
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

      const navRef = React.useRef()
      navRef.current = navBackground
      useEffect(() => {
          const handleScroll = () => {
              const show = window.scrollY > 50
              if (show) {
                  setNavBackground('appBarScroll')
              } else {
                  setNavBackground('appBar')
              }
          }
          document.addEventListener('scroll', handleScroll)
          return () => {
              document.removeEventListener('scroll', handleScroll)
          }
      }, [])

      const handleOpen = () => {
          setOpen(true)
      }
      const handleClose = () => {
          setOpen(false)
      }


    return (
        <>
        <>
            <Hidden smDown>
                <AppBar position='fixed' className={classes[navRef.current]} >
                <Toolbar className={classes.toolBar} >
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Link to='/' >
                        <img src="logo.png" alt="" style={{width: '80px', height: '80px', marginLeft: '80px'}}/>
                        </Link>
                    </div>
                
                   <div>
                       {!Name ?  <div style={{display: 'flex', alignItems: 'center'}} >
                    <Link className={classes.navLink} to='/' >Home</Link>
                    <Link className={classes.navLink} to='/invest' >Invest</Link>
                    <Link className={classes.navLink} to='/account' >My Account</Link>
                    <Link style={{margin: '0px 20px', textDecoration: 'none'}} to='/signin'>
                    <button className={classes.headerBtn} >
                        <span style={{fontFamily: 'Montserrat'}} >Sign In</span>
                    </button>
                    </Link>
                    </div>
                    :
                    <div style={{display: 'flex', alignItems: 'center'}} >
                        <div>
                            <Link to='/get-a-loan' >
                            <button className={classes.loanBtn} >
                                Get A Loan
                            </button>
                            </Link>
                        </div>
                        <div>
                        <Button
                            onClick={handleOpen}
                            aria-controls="simple-menu"
                            aria-haspopup="true" 
                        >
                           <div style={{display: 'flex', alignItems: 'center'}} >
                           <Avatar style={{width: '35px', height: '35px' }} variant='circle' src={PhotoURL} />
                            <h6 style={{marginLeft: '5px', marginTop: '15px', color: 'white', fontSize: '15px'}} >{Name.toLowerCase()}</h6>
                           </div>
                        </Button>
                        <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} >
                                <div>
                                <div style={{display: 'flex', justifyContent: 'center'}}><Avatar style={{width: '80px', height: '80px', marginBottom: '20px' }} variant='circle' src={PhotoURL} /></div>
                                <h6 style={{fontWeight: 'bold'}} >{Name} {LastName}</h6>
                                <span style={{fontWeight: 'bold', color: 'rgb(138, 138, 138)', fontSize: '15px'}} >{Email}</span>

                                <Divider style={{marginTop: '30px'}} />
                                <div style={{textAlign: 'left'}} >
                                <Link to='/account' style={{textDecoration: 'none', color: 'black'}} >
                                <h6 className={classes.menuLink} >Settings</h6>
                                </Link>
                                <Divider style={{marginTop: '20px'}} />
                                <Link to='/invest' style={{textDecoration: 'none', color: 'black'}}>
                                <h6 className={classes.menuLink} >Invest</h6>
                                </Link>
                                <Divider style={{marginTop: '20px'}} />
                                <Link to='/signin' style={{textDecoration: 'none',}} onClick={signOut} >
                                <h6 className={classes.menuLink} style={{color: 'red'}} >Sign Out</h6>
                                </Link>
                                <Divider style={{marginTop: '20px'}} />
                                </div>
                                </div>
                            </div>
                        </div>
                        </Fade>
                    </Modal>
                        </div>
                    </div>
                    }
                   </div>
                    
                </Toolbar>
                </AppBar>
            </Hidden>

            <HeaderMobile user={currentUser} signOut={signOut} />
            </>
        </>
    )
}

export default Header;
