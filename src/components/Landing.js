import { Hidden, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import LandingMobile from './LandingMobile';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import AirplanemodeActiveOutlinedIcon from '@material-ui/icons/AirplanemodeActiveOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';
// import Chart from './Chart';

const useStyles = makeStyles({
    hero: {
        backgroundImage: 'url("image5.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        // borderBottomLeftRadius: '300px',
        // borderBottomRightRadius: '300px',
    },
    heroContent: {
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    heroPhoneImage: {
        position: 'absolute',  
        zIndex: '1',
        transition: '5s',
        right: '0',
        marginTop: '-130px'
    },
    phoneImageScroll: {
        position: 'absolute', 
        zIndex: '1',
        marginTop: '200px',
        transition: '5s',
        right: '0'
    },
    heroBtnOne: {
        border: 'none', 
        outline: 'none',
        padding: '15px 20px',
        borderRadius: '30px',
        backgroundColor: '#F6CD2D',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        '&:hover': {
            backgroundColor: '#00264C'
        }
    },
    heroBtnTwo: {
        border: '2px solid white', 
        outline: 'none',
        padding: '15px 20px',
        borderRadius: '30px',
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        marginLeft: '50px',
        '&:hover': {
            color: '#F6CD2D',
            borderColor: '#F6CD2D',
        }
    },
    belowHero: {
        backgroundColor: '#F3F3F3', 
        zIndex: '100', 
        position: 'relative', 
        marginBottom: '50px',
    },
    benefitBox: {
        padding: '20px 30px',
        transition: '.5s',
        borderRadius: '10px',
        margin: '0px 30px',
        '&:hover': {
            boxShadow: '0 8px 15px 2px #ccc',
            cursor: 'pointer',
            '& span': {
                backgroundColor: 'rgb(199, 199, 199)'
            }
        }
    }
});

function Landing() {
    const classes = useStyles();
    const [phoneImage, setPhoneImage] = useState('heroPhoneImage');
    const {currentUser, signOut} = useAuth();

    useEffect(() => (
        Aos.init({
            duration: 1000,
        })
    ))

      const phoneRef = React.useRef()
      phoneRef.current = phoneImage
      useEffect(() => {
          const handleScroll = () => {
              const show = window.scrollY > 50
              if (show) {
                  setPhoneImage('phoneImageScroll')
              } else {
                  setPhoneImage('heroPhoneImage')
              }
          }
          document.addEventListener('scroll', handleScroll)
          return () => {
              document.removeEventListener('scroll', handleScroll)
          }
      }, [])
    return (
        <div>
            <Hidden smDown>
            <Header />
               <div className={classes.hero} >
                <div className={classes.heroContent} >
                    <div className={classes.heroText} >
                        <div style={{marginLeft: '50px'}} data-aos='zoom-in-right' >
                            <h1 style={{fontFamily: 'Montserrat', fontWeight: 'bolder', fontSize: '50px', width: '700px', color: 'white', marginTop: '100px', marginBottom: '50px'}} >Secure and Anonymous Cryptocurrency</h1>
                            <p style={{color: 'rgb(196, 196, 196)', width: '350px', fontWeight: 'bold'}}>
                                Coincrease is an investment platform,
                                made to be easily used by everyone.
                            </p>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '30px'}} >
                                <button className={classes.heroBtnOne} >
                                    Coincrease Investment
                                </button>
                                <button className={classes.heroBtnTwo} >
                                    More About Coincrease
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.heroImage} >
                        <img style={{width: '900px', position: 'absolute', top: '14.6em', right: '0'}} src="image6.png" alt=""/>
                        <div className={classes[phoneRef.current]}  >
                            <img  data-aos='zoom-in-left' src="image4.png" alt=""/>
                        </div>
                    </div>
                </div>
               </div>
               
               <div className={classes.belowHero} >
                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '80px 0px'}} >
                        <img src="image.png" alt=""/>
                        <div style={{ marginLeft: '-100px'}}>
                            <div style={{display: 'flex', alignItems: 'center',}} >
                                <div style={{height: '5px', width: '50px', backgroundColor: '#F7CD2D',}} ></div>
                                <h6 style={{marginLeft: '20px'}}>01.</h6>
                                <h6 style={{marginLeft: '10px'}}>WELCOME</h6>
                            </div>
                            <div>
                                <h3 style={{width: '480px', fontSize: '40px', fontWeight: 'bolder', color: '#012241'}}>Coincrease is Digital Cash
                                Which Can Be
                                Spent Anywhere</h3>

                                <p style={{marginTop: '50px', width: '450px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >You can use Coincrease to make instant transactions privately. We are creating EXCLUSIVE blockchain that will give us anonymity, which is highly overlooked by most projects.</p>
                            </div>
                        </div>
                   </div>

                   <div style={{padding: '80px 80px'}} >
                        <div style={{display: 'flex', alignItems: 'center',}} >
                                <div style={{height: '5px', width: '50px', backgroundColor: '#F7CD2D',}} ></div>
                                <h6 style={{marginLeft: '20px'}}>02.</h6>
                                <h6 style={{marginLeft: '10px'}}>BENEFITS</h6>
                        </div>
                        <div><h2 style={{fontWeight: 'bolder', color: '#012241', marginTop: '20px', fontSize: '40px'}} >Coincrease Benefits</h2></div>
                        <div style={{display: 'flex', alignItems: 'center', padding: '10px 50px', marginTop: '50px'}} >
                            <div className={classes.benefitBox} >
                                <span style={{textAlign: 'left', padding: '10px', width: '100px', borderBottomRightRadius: '20px', transition: '.5s'}} >01.</span>
                                <div  style={{textAlign: 'center'}}><LockOpenOutlinedIcon  style={{fontSize: '70px', color: '#F7CD2D'}} /></div>
                                <h3 style={{textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#012241'}}>Privacy</h3>
                                <p style={{textAlign: 'center', width: '150px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >Assured Privacy and
                                Anonymity</p>
                            </div>
                            <div className={classes.benefitBox} >
                                <span style={{textAlign: 'left', padding: '10px', width: '100px', borderBottomRightRadius: '20px', transition: '.5s'}} >02.</span>
                                <div  style={{textAlign: 'center'}}><AirplanemodeActiveOutlinedIcon  style={{fontSize: '70px', color: '#F7CD2D'}} /></div>
                                <h3 style={{textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#012241'}}>Speed</h3>
                                <p style={{textAlign: 'center', width: '155px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >Instant, on-demand
                                settlement</p>
                            </div>
                            <div className={classes.benefitBox} >
                                <span style={{textAlign: 'left', padding: '10px', width: '100px', borderBottomRightRadius: '20px', transition: '.5s'}} >03.</span>
                                <div  style={{textAlign: 'center'}}><ThumbUpOutlinedIcon  style={{fontSize: '70px', color: '#F7CD2D'}} /></div>
                                <h3 style={{textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#012241'}}>Certainty</h3>
                                <p style={{textAlign: 'center', width: '150px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >Real-time traceability
                                of funds</p>
                            </div>
                            <div className={classes.benefitBox} >
                                <span style={{textAlign: 'left', padding: '10px', width: '100px', borderBottomRightRadius: '20px', transition: '.5s'}} >04.</span>
                                <div  style={{textAlign: 'center'}}><LocalAtmOutlinedIcon  style={{fontSize: '70px', color: '#F7CD2D'}} /></div>
                                <h3 style={{textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#012241'}}>Cost</h3>
                                <p style={{textAlign: 'center', width: '150px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >Low operational and
                                liquidity costs</p>
                            </div>
                        </div>
                   </div>
               </div>

               {/* <Chart /> */}
            </Hidden>
            <LandingMobile />
        </div>
    )
}

export default Landing;
