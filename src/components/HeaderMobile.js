import React, { useEffect, useState } from 'react';
import { makeStyles, AppBar, Toolbar, Hidden, List, ListItem, Drawer } from '@material-ui/core';
import {Link} from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import StringData from '../context/StringData'

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
        color: '#F6CD2D',
        transition: '.5s',
        '&:hover': {
            borderBottom: '1px solid #F6CD2D',
            textDecoration: 'none',
            color: '#F6CD2D'
        }
    },
});

function HeaderMobile({ user, signOut }) {
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState('appBar');
    const [open, setOpen] = useState(false);
    const Name = localStorage.getItem(StringData.FirstName)

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

      const handleDrawerOpen = () => {
          setOpen(true)
      }
      
      const handleDrawerClose = () => {
          setOpen(false)
      }

    return (
        <div>
            <Hidden mdUp>
                <AppBar position='fixed' className={classes[navRef.current]}  >
                <Toolbar className={classes.toolBarSm} >
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <img src="logo.png" alt="" style={{width: '30px', height: '30px'}}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}} >
                        <div>
                            {user && <p style={{marginTop: '15px', fontSize: '12px', margin: '0px 10px', marginLeft: '120px', color: '#F6CD2D'}} >Hi, {Name}</p>}
                        </div>
                        <div>
                        {user ?  <Link style={{margin: '0px 20px', textDecoration: 'none', margin: '0px 10px'}} to='/signin'>
                        <button onClick={signOut} className={classes.headerBtn} >
                            <span style={{fontFamily: 'Montserrat'}} ><ExitToAppIcon /></span>
                        </button>
                        </Link> : 
                        <Link style={{margin: '0px 20px', textDecoration: 'none'}} to='/signin'>
                        <button className={classes.headerBtn} >
                            <span style={{fontFamily: 'Montserrat'}} ><LockOpenIcon/></span>
                        </button>
                        </Link>
                        }
                        </div>
                    </div>
                    <div>
                        <div onClick={handleDrawerOpen}><MenuIcon /></div>
                        <Drawer
                            open={open}
                            onClose={handleDrawerClose}
                            anchor='right'
                        >
                            <List>
                                <Link className={classes.navLink} to='/' >
                                    <ListItem button>
                                        <h5>Home</h5>
                                    </ListItem>
                                </Link>
                                <Link className={classes.navLink} to='/invest' >
                                    <ListItem button>
                                        <h5>Invest</h5>
                                    </ListItem>
                                </Link>
                                <Link className={classes.navLink} to='/account' >
                                    <ListItem button>
                                        <h5>My Account</h5>
                                    </ListItem>
                                </Link>
                               
                            </List>
                        </Drawer>
                    </div>
                </Toolbar>
                </AppBar>
            </Hidden>
        </div>
    )
}

export default HeaderMobile;
