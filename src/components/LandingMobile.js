import { Hidden, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Header from './Header';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import AirplanemodeActiveOutlinedIcon from '@material-ui/icons/AirplanemodeActiveOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import { useAuth } from '../context/AuthContext';
import Chart from './Chart';
import Calculator from './Calculator';

const useStyles = makeStyles({
    hero: {
        backgroundImage: 'url("image5.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        paddingBottom: '20px'
    },
    heroContent: {
        paddingTop: '100px',
        textAlign: 'center'
    },
    heroText: {
        display: 'flex',
        justifyContent: 'center'
    },
    heroBtnOne: {
        border: 'none', 
        outline: 'none',
        padding: '10px 15px',
        borderRadius: '30px',
        backgroundColor: '#F6CD2D',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        fontSize: '10px',
        '&:hover': {
            backgroundColor: '#00264C'
        }
    },
    heroBtnTwo: {
        border: '2px solid white', 
        outline: 'none',
        padding: '10px 15px',
        borderRadius: '30px',
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        marginLeft: '50px',
        fontSize: '10px',
        '&:hover': {
            color: '#F6CD2D',
            borderColor: '#F6CD2D',
        }
    },
    heroImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heroPhoneImage: {
         
        zIndex: '1',
        transition: '5s',
        right: '0',
        marginTop: '20px',
        width: '100px',
        maxWidth: '100px',
    },
    phoneImageScroll: {
        
        zIndex: '1',
        marginTop: '100px',
        transition: '5s',
        width: '100px',
        maxWidth: '100px',
    },
    belowHero: {
        paddingBottom: '50px'
    },
    benefitBox: {
        padding: '20px 30px',
        transition: '.5s',
        borderRadius: '10px',
        margin: '30px',
        '&:hover': {
            boxShadow: '0 8px 15px 2px #ccc',
            cursor: 'pointer',
            '& span': {
                backgroundColor: 'rgb(199, 199, 199)'
            }
        }
    }
});

function LandingMobile() {
    const classes = useStyles();
    const { currentUser, signOut } = useAuth();

    useEffect(() => {
        Aos.init({
            duration: 1000,
        })
    })

    return (
        <div>
            <Hidden mdUp>
            <Header user={currentUser} signOut={signOut} />
                <div className={classes.hero} >
                    <div className={classes.heroContent} >
                    <div className={classes.heroText} >
                        <div style={{textAlign: 'center'}} data-aos='zoom-in-right' >
                            <h1 style={{fontFamily: 'Montserrat', fontWeight: 'bolder', fontSize: '40px', width: '200', color: 'white', marginTop: '80px', marginBottom: '50px'}} >Secure and Anonymous Cryptocurrency</h1>
                            <p style={{color: 'rgb(196, 196, 196)', width: '100%', fontWeight: 'bold'}}>
                                Coincrease is an investment platform,
                                made to be easily used by everyone.
                            </p>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '30px', padding: '0px 10px'}} >
                                <button className={classes.heroBtnOne} >
                                    Coincrease Investment
                                </button>
                                <button className={classes.heroBtnTwo} >
                                    More About Coincrease
                                </button>
                            </div>

                        <div className={classes.heroImage} >
                            <img style={{width: '300px', marginTop: '50px'}} src="image4.png" alt=""/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div >
                    <Calculator />
                </div>

                <div className={classes.belowHero} >
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}} >
                        <img style={{width: '250px', height: '250px'}} src="image.png" alt=""/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginLeft: '-90px', marginBottom: '20px'}} >
                        <div style={{display: 'flex', alignItems: 'center', textAlign: 'left'}} >
                            <div style={{height: '5px', width: '30px', backgroundColor: '#F7CD2D',}} ></div>
                            <h6 style={{marginLeft: '10px'}}>01.</h6>
                            <h6 style={{marginLeft: '10px'}}>WELCOME</h6>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', }}>
                      <div style={{width: '250px'}} >
                        <h3 style={{fontSize: '30px', fontWeight: 'bolder', color: '#012241'}}>Coincrease is Digital Cash
                            Which Can Be
                            Spent Anywhere</h3>

                            <p style={{marginTop: '30px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >You can use Coincrease to make instant transactions privately. We are creating EXCLUSIVE blockchain that will give us anonymity, which is highly overlooked by most projects.</p>
                      </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginLeft: '-90px', marginBottom: '20px'}} >
                        <div style={{display: 'flex', alignItems: 'center', textAlign: 'left'}} >
                            <div style={{height: '5px', width: '30px', backgroundColor: '#F7CD2D',}} ></div>
                            <h6 style={{marginLeft: '10px'}}>02.</h6>
                            <h6 style={{marginLeft: '10px'}}>BENEFITS</h6>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', }}>
                      <div style={{width: '250px'}} >
                        <h3 style={{fontSize: '30px', fontWeight: 'bolder', color: '#012241'}}>Coincrease Benefits</h3>

                            <p style={{marginTop: '30px', fontSize: '15px', color: 'rgb(148, 148, 148)'}} >You can use Coincrease to make instant transactions privately. We are creating EXCLUSIVE blockchain that will give us anonymity, which is highly overlooked by most projects.</p>
                      </div>
                    </div>

                    <div style={{padding: '10px 50px', marginTop: '30px'}} >
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
            </Hidden>
        </div>
    )
}

export default LandingMobile;
