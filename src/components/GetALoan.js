import { Hidden } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom'

function GetALoan() {
    return (
        <div>
            <Hidden smDown>
            <Link to='/' ><h3>Coincrease</h3></Link>
            <h5>Loan With Coincrease</h5>
            </Hidden>
            <Hidden mdUp>
            <Link to='/' ><h3>Coincrease</h3></Link>
            <h5>Loan With Coincrease</h5>
            </Hidden>
        </div>
    )
}

export default GetALoan
