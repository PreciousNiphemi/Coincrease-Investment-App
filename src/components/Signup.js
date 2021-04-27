import React, {useState} from 'react';
import {CircularProgress, Divider, Hidden, makeStyles } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {db, auth} from './firebase';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SignupMobile from './SignupMobile';
import { useAuth } from '../context/AuthContext';
import StringData from '../context/StringData';


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
        marginTop: '30px',
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

function Signup() {
    const classes = useStyles(); 
    const history = useHistory();
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
   
   const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        if(firstName === '' || lastName === '' || phone === ''){
            return (
                setError('Please fill the needed fields.'),
                setLoading(false)
            )
        }else {
            setError(null)
            setLoading(true)
            signUp(email, password).then(res => {
                const user = auth.currentUser;
                user.sendEmailVerification();
                db.collection('users').doc().set({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    'id': res.user.uid
                }).then(ref => {
                    localStorage.setItem(StringData.ID, res.user.uid);
                    localStorage.setItem(StringData.FirstName, firstName);
                    localStorage.setItem(StringData.LastName, lastName);
                    localStorage.setItem(StringData.Email, email);
                    localStorage.setItem(StringData.Password, password);
                    localStorage.setItem(StringData.PhotoURL, '');
                    localStorage.setItem(StringData.UPLOAD_CHANGED, 'state_changed');
                    localStorage.setItem(StringData.Description, '');
                    // localStorage.setItem(StringData.FirebaseDocumentId, ref.id);
                })
                if(res){
                    history.push('/email-verify')
                }
            }).catch(err => {
                console.error(err)
                setLoading(false)
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
                            <h5 className={classes.label} >First Name</h5>
                            <input onChange={(e) => setFirstname(e.target.value)} name='firstName' type="text" placeholder='John' className={classes.input} value={firstName} />
                        </div>
                        <div>
                            <h5 className={classes.label} >Last Name</h5>
                            <input onChange={(e) => setLastname(e.target.value)} type="text" placeholder='Doe' className={classes.input} value={lastName} />
                        </div>
                        <div>
                            <h5 className={classes.label} >Email</h5>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='yourmail@mail.com' className={classes.input} value={email} />
                        </div>
                        <div>
                            <h5 className={classes.label} >Phone</h5>
                            <PhoneInput containerClass country={'us'} onChange={setPhone} className={classes.input} value={phone} />
                        </div>
                        <div>
                            <h5 className={classes.label} >Password</h5>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='123456#*^' className={classes.input} value={password} />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            {loading ? <button className={classes.signBtn} ><CircularProgress /></button> : <button disabled={loading} type='submit' className={classes.signBtn} >Register</button>}
                        </div>
                    </form>
                    {error != null ? <p style={{textAlign: 'center', color: 'red', fontSize: '13px', marginTop: '10px'}} >{error}</p> : null}
                    <Divider style={{marginTop: '20px'}} />
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <p style={{color: 'white'}} >Already have an account? <Link style={{color: '#F6CD2D', textDecoration: 'none'}} to="/signin">Sign In</Link></p>
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

        <SignupMobile />
        </>
    )
}

export default Signup;
