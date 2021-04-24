import React, {useState, useEffect} from 'react';
import { makeStyles, AppBar, Toolbar, Hidden } from '@material-ui/core';
import {Link} from 'react-router-dom';
import HeaderMobile from './HeaderMobile'
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
        color: 'white',
        transition: '.5s',
        '&:hover': {
            borderBottom: '1px solid #F6CD2D',
            textDecoration: 'none',
            color: '#F6CD2D'
        }
    }
});

function Header({user, signOut}) {
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState('appBar');
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


    return (
        <>
        <>
            <Hidden smDown>
                <AppBar position='fixed' className={classes[navRef.current]} >
                <Toolbar className={classes.toolBar} >
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src="logo.png" alt="" style={{width: '80px', height: '80px', marginLeft: '80px'}}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}} >
                    <Link className={classes.navLink} to='/' >Home</Link>
                    <Link className={classes.navLink} to='/invest' >Invest</Link>
                    <Link className={classes.navLink} to='/account' >My Account</Link>
                    {user && (
                        <p style={{marginTop: '15px'}} >Welcome, {Name}</p>
                    )}
                   {user ?  <Link style={{margin: '0px 20px', textDecoration: 'none'}} to='/signin'>
                    <button onClick={signOut} className={classes.headerBtn} >
                        <span style={{fontFamily: 'Montserrat'}} >Sign Out</span>
                    </button>
                    </Link> : 
                    <Link style={{margin: '0px 20px', textDecoration: 'none'}} to='/signin'>
                    <button className={classes.headerBtn} >
                        <span style={{fontFamily: 'Montserrat'}} >Sign In</span>
                    </button>
                    </Link>
                    }
                    
                    </div>
                </Toolbar>
                </AppBar>
            </Hidden>

            <HeaderMobile user={user} signOut={signOut} />
            </>
        </>
    )
}

export default Header;
