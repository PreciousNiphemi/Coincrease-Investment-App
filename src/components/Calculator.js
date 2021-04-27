import { Hidden, makeStyles } from '@material-ui/core';
import React, {useState} from 'react'

const useStyles = makeStyles({
    input: {
        padding: '10px 20px',
        margin: '10px auto'
    }
});

function Calculator() {
    const classes = useStyles();
    const [principal, setPrincipal] = useState();
    const [years, setYears] = useState();
    const [interest, setInterest] = useState('30');
    const [result, setResult] = useState();

    const calculate = (e) => {
        e.preventDefault();
        // A=p(1 + (r/n)) ^ (nt)
        const result = principal * Math.pow(1 + interest, years);
        setResult(result.toFixed(1))
    } 

    return (
        <div>
            <Hidden smDown>
            <div>
                <form action="" onSubmit={calculate} >
                <input type="text" value={principal} placeholder='Principal' onChange={e => setPrincipal(e.target.value)} />
                <input type="number" value={years} placeholder='Years' onChange={e => setYears(e.target.value)} />
                <input type="number" value={interest} placeholder='Interest' onChange={e => setInterest(e.target.value / 100)} />

                <button type='submit' >Calculate</button>
                <div>{result}</div>
                </form>
            </div>
            </Hidden>
            <Hidden mdUp>
            <div style={{ marginTop: '50px', textAlign: 'center', width: '100%'}}>
                <h4 style={{color: '#013972', fontWeight: 'bold', marginBottom: '10px'}} >Investment Calculator</h4>
                <form action="" onSubmit={calculate} >
                <input className={classes.input} type="text" value={principal} placeholder='Principal' onChange={e => setPrincipal(e.target.value)} />
                <input className={classes.input} type="number" value={years} placeholder='Years' onChange={e => setYears(e.target.value)} />
                <input className={classes.input} type="number" value={`${interest}`} placeholder='Interest' onChange={e => setInterest(e.target.value / 100)} />
                
                <div style={{textAlign: 'left', marginTop: '10px' }} >
                    <h5 style={{fontSize: '15px', marginLeft: '60px'}} >Returns : <span>${result}</span> </h5>
                </div>
                <div style={{marginTop: '20px'}} ><button style={{border: '1px solid #ccc', padding: '3px 10px', borderRadius: '5px'}} type='submit' >Calculate</button></div>
                <div></div>
                </form>
            </div>
            </Hidden>
        </div>
    )
}

export default Calculator
