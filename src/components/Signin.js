import React, {useState} from 'react';
import { CircularProgress, Divider, Hidden, makeStyles } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
// import HomeIcon from '@material-ui/icons/Home';
import SigninMobile from './SigninMobile';
import { useAuth } from '../context/AuthContext';
import {db} from './firebase';
import StringData from '../context/StringData'

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
        width: '400px',
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
        padding: '10px 100px',
        borderRadius: '30px',
        backgroundColor: '#F6CD2D',
        color: 'white',
        fontWeight: 'bold',
        transition: '.5s',
        marginTop: '20px',
        '&:hover': {
            backgroundColor: '#00264C'
        }
    },
    homeIcon: {
        display: 'flex',
        justifyContent: 'center'
    },
    home: {
        fontSize: '30px',
        color: '#26E0FB',
        cursor: 'pointer'
    },
    signBoxSm: {
        marginTop: '20px',
        '& h2': {
            fontSize: '20px'
        }
    },
    inputSm: {
        borderColor: '#26DDF9',
        borderRadius: '10px',
        margin: '0px auto',
        outline: 'none',
        border: 'none',
        transition: '.1s',
        boxShadow: '0 0 8px 0px #ccc',
        padding: '10px 20px',
        position: 'relative',
        width: '300px',
        '&:focus': {
            boxShadow: '0 0 8px 0px #26ddf975',
        }
    }
});

function Signin() {
    const classes = useStyles(); 
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const {signIn} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        if(email === '' || password === ''){
            return (
                setError('No field can be empty.'),
                setLoading(false)
            )
        }else {
            signIn(email, password).then(res => {
                let user = res.user;
            if(user) {
                db.collection('users').where('id', '==', user.uid).get()
                .then((querySnapshot)=> {
                    querySnapshot.forEach(doc => {
                        const currentData = doc.data();
                        localStorage.setItem(StringData.FirebaseDocumentId, doc.id)
                        localStorage.setItem(StringData.ID, currentData.id)
                        localStorage.setItem(StringData.FirstName, currentData.firstName)
                        localStorage.setItem(StringData.LastName, currentData.lastName)
                        localStorage.setItem(StringData.Email, currentData.email)
                        localStorage.setItem(StringData.Password, currentData.password)
                        localStorage.setItem(StringData.PhotoURL, currentData.URL)
                        localStorage.setItem(StringData.Description, currentData.description)
                if(res) {
                    history.push('/account')
                }
            })
        })
    }

            }).catch(err => {
                setLoading(false)
                console.error(err)
                if(err.code){
                    setError(err.message)
                }
            })
        }

        
    }


    return (
        <>
            <Hidden smDown>
                <div className={classes.signIn} >
                <div className={classes.signBox} >
                    <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }} >
                            <h2 style={{fontFamily: 'Montserrat Alternates', color: 'white'}} >Coincrease</h2>
                    </div>
                    <form onSubmit={handleSubmit} action="" style={{display: 'block' }} >
                        <div>
                            <h5 className={classes.label} >Email</h5>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='yourmail@mail.com' className={classes.input} value={email} />
                        </div>
                        <div>
                            <h5 className={classes.label} >Password</h5>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='123456#*^' className={classes.input} value={password} />
                        </div>
                        <div style={{textAlign: 'right', marginTop: '20px'}} >
                            <Link style={{textDecoration: 'none'}} to='/forgotPassword' >
                                <p style={{color: '#F6CD2D' }} >Forgot Password?</p>
                            </Link>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            {loading ? <button className={classes.signBtn} ><CircularProgress /></button> : <button disabled={loading} type='submit' className={classes.signBtn} >Sign In</button>}
                        </div>
                    </form>
                    {error != null ?<div style={{display: 'flex', justifyContent: 'center'}} >
                        <p style={{textAlign: 'center', color: 'red', fontSize: '13px', marginTop: '0px', width: '200px'}} >{error}</p>
                    </div> : null}
                    <Divider style={{marginTop: '20px'}} />
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <p style={{color: '#fff',}}>Do not have an account? <Link style={{color: '#F6CD2D', textDecoration: 'none'}} to="/signup">Sign up</Link></p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <p style={{textAlign: 'center', fontSize: '12px', color: 'rgb(165, 165, 165)'}} >Trust is Our Product™<br />
                            For trademarks and patents, please see our <Link to='/' style={{color: '#F6CD2D', textDecoration: 'none'}} >Privacy Policy</Link>.<br />
                            NMLS #1518126<br />
                            © Copyright 2021 Coincrease Company, LLC.
                        </p>
                    </div>
                </div>
            </div>
        </Hidden>

        <SigninMobile />
        
        </>
    )
}

export default Signin
