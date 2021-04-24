import { Hidden } from '@material-ui/core';
import React from 'react';
import {useAuth} from '../context/AuthContext'
import InvestMobile from './InvestMobile';
import StringData from '../context/StringData';
import {Link} from 'react-router-dom'

function Invest() {
    const {currentUser} = useAuth();
    const Name = localStorage.getItem(StringData.FirstName)
    return (
        <>
        <Hidden smDown>
            <Link style={{textDecoration: 'none', color: '#003970', textAlign: 'center'}} to='/' >
                <h2 style={{fontFamily: 'Montserrat Alternates'}} >Coincrease</h2>
            </Link>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <h3 style={{marginTop: '30px', fontWeight: 'bold'}} >Hello {Name}. Start your Investment with Coincrease</h3>
            </div>
        </Hidden>

        <InvestMobile />
        </>
    )
}

export default Invest
