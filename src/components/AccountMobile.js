import { Hidden } from '@material-ui/core';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import StringData from '../context/StringData';
import {Link} from 'react-router-dom'

function AccountMobile() {
    const {currentUser} = useAuth();
    const Name = localStorage.getItem(StringData.FirstName)
    return (
        <Hidden mdUp>
            <Link style={{textDecoration: 'none', color: '#003970', textAlign: 'center', }} to='/' >
                <h2 style={{fontFamily: 'Montserrat Alternates', marginTop: '30px'}} >Coincrease</h2>
            </Link>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <h5 style={{marginTop: '30px', fontWeight: 'bold', textAlign: 'center'}} >Hello {Name}. Here's Your Dashboard.</h5>
        </div>
        </Hidden>
    )
}

export default AccountMobile
