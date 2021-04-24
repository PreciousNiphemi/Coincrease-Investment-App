import { Hidden, makeStyles, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
    signIn: {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: 'url("image5.jpg")' ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '100px'
    },
    signBox: {
        padding: '20px 50px',
        backgroundColor: 'transparent',
        '& form': {
            marginTop: '20px',
            marginBottom: '50px'
        }
    },
    label: {
        marginTop: '20px',
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#F6CD2D'
    },
    input: {
        borderRadius: '5px',
        margin: '0px auto',
        outline: 'none',
        border: 'none',
        transition: '.1s',
        padding: '10px 20px',
        position: 'relative',
        backgroundColor: 'rgba(207, 207, 207, 0.336)',
        color: 'white',
        '&:focus': {
            backgroundColor: 'rgba(207, 207, 207, 0.562)'
        }
    },
    signBtn: {
        border: 'none', 
        outline: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        backgroundColor: '#F6CD2D',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        marginTop: '20px',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#00264C'
        }
    },
});

function ForgotPasswordMobile() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const {resetPassword} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        setMessage('')

        resetPassword(email).then(() => {
            console.log('Success')
            setLoading(false)
            setError(null)
            setMessage('Check your inbox for further instructions.')
            setEmail('')
        }).catch(err => {
            setLoading(false)
            console.error(err)
            if(err.code){
                setError(err.message)
            }
        })
    }

    return (
        <div>
            <Hidden mdUp>
            <div className={classes.signIn} >
                <div className={classes.signBox} >
                    <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }} >
                        <Link style={{textDecoration: 'none', color: 'white'}} to='/' >
                            <h2 style={{fontFamily: 'Montserrat Alternates'}} >Coincrease</h2>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} action="" style={{display: 'block', marginTop: '50px' }} >
                        <p style={{textAlign: 'center', color: 'rgb(24, 255, 24)', fontWeight: 'bold'}} >{message}</p>
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            <div>
                            <h5 className={classes.label} >Email</h5>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='yourmail@mail.com' className={classes.input} value={email} />
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            {loading ? <button className={classes.signBtn} ><CircularProgress /></button> : <button disabled={loading} type='submit' className={classes.signBtn} >Reset Password</button>}
                        </div>
                        <div style={{textAlign: 'center', marginTop: '20px'}} >
                            <Link style={{textDecoration: 'none'}} to='/signin' >
                                <p style={{color: '#F6CD2D' }} >Sign In</p>
                            </Link>
                        </div>
                    </form>
                    {error != null ? <p style={{textAlign: 'center', color: 'red', fontSize: '13px', marginTop: '10px'}} >{error}</p> : null}
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
                        <p style={{textAlign: 'center', fontSize: '12px', color: 'rgb(165, 165, 165)'}} >Trust is Our Product™<br />
                            For trademarks and patents, please see our <Link to='/' style={{color: '#F6CD2D', textDecoration: 'none'}} >Privacy Policy</Link>.<br />
                            NMLS #1518126<br />
                            © Copyright 2021 Coincrease Company, LLC.
                        </p>
                    </div>
                </div>
                </div>
            </Hidden>
        </div>
    )
}

export default ForgotPasswordMobile
