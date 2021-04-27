import { Hidden } from '@material-ui/core';
import React, { useEffect } from 'react';
import MailIcon from '@material-ui/icons/Mail';
import { useAuth } from '../context/AuthContext';
import {useHistory} from 'react-router-dom'

function EmailVerified() {
    const {currentUser} = useAuth();
    const history = useHistory()

    useEffect(() => {
        if(currentUser) {
            if(currentUser.emailVerified === true) {
                console.log(currentUser.emailVerified )
            history.push('/signin')
            }
        }
    })

    return (
        <div>
            <Hidden smDown  >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{textAlign: 'center', padding: '100px 100px', backgroundColor: 'white', borderRadius: '10px', marginTop: '100px'}} >
                    <MailIcon style={{fontSize: '50px', marginBottom: '20px', color: '#013972'}} />
                    <h2 style={{fontWeight: 'bold', color: '#013972'}}>Coincrease Email verification</h2>
                    <div style={{marginTop: '20px', color: '#F6CD2D'}} >Check your inbox</div>
                    <div style={{marginTop: '20px', color: 'rgb(138, 138, 138)'}}>
                        <p>Please refresh this page after your email has been verified to sign in.</p>
                    </div>
                    </div>
                </div>
            </Hidden>
            <Hidden mdUp  >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{textAlign: 'center', padding: '50px 50px', backgroundColor: 'white', borderRadius: '10px', marginTop: '100px'}} >
                    <MailIcon style={{fontSize: '50px', marginBottom: '20px', color: '#013972'}} />
                    <h5 style={{fontWeight: 'bold', color: '#013972'}} >Coincrease Email verification</h5>
                    <div style={{marginTop: '20px', color: '#F6CD2D'}} >Check your inbox</div>
                    <div style={{marginTop: '20px', color: 'rgb(138, 138, 138)'}} >
                        <p>Please refresh this page after your email has been verified to sign in.</p>
                    </div>
                    </div>
                </div>
            </Hidden>
        </div>
    )
}

export default EmailVerified
