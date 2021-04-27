import React, {useState, useEffect, useRef} from 'react';
import CryptoDashboard from './CryptoDashboard';
import {formatData} from './util';
import {Hidden, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    select: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px'
    },
    mainChart: {
        height: '400px',
        width: '1000px',
        marginBottom: '50px'
    },
    mainChartSm: {
        width: '100%',
        height: '300px',
        marginBottom: '90px'
    }
});

function Chart() {
    const classes = useStyles();
    const [currencies, setCurrencies] = useState([]);
    const [pair, setPair] = useState('BTC/USD');
    const [price, setPrice] = useState('0.00');
    const [pastData, setPastdata] = useState('0.00');
    const ws = useRef(null);

    let first = useRef(null);
    const url = 'https://api.pro.coinbase.com'

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

        let pairs = [];

        const apiCall = async () => {
            await fetch(url + '/products').then(res => res.json()).then(data => (pairs = data));
            console.log('pairs', pairs);
            let filtered = pairs.filter(pair => {
                if(pair.quote_currency === 'USD') {
                    return pair;
                }
            });
            filtered = filtered.sort((a,b) => {
                if(a.base_currency < b.base_currency) {
                    return -1;
                }
                return 0;
            });
            console.log(filtered);
            setCurrencies(filtered);

            first.current = true;
        }

        apiCall()
    }, []);


    useEffect(() => {
        if(!first.current) {
            console.log('Returning on first render!');
            return;
        }

        console.log('Running pair change');
        let msg = {
            type: 'subscribe',
            product_ids: [pair],
            channels: ['ticker']
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoryData = async () => {
            let dataArr = [];
            await fetch(historicalDataURL).then(res => res.json()).then(data => (dataArr = data));
            console.log(dataArr);

            let formattedData = formatData(dataArr);
            setPastdata(formattedData);
        };
        fetchHistoryData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if(data.type !== 'ticker') {
                console.log('Non ticker event!', e);
                return;
            }

            if(data.product_id === pair) {
                setPrice(data.price)
            }
        }
    }, [pair])

    const handleSelect = (e) => {
        console.log(e.target.value)

        let unsubMsg = {
            type: 'unsubscribe',
            product_ids: [pair],
            channels: ['ticker']
        }
        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub)

        setPair(e.target.value)
    }

    return (
       <>
            <Hidden smDown>
            <div className={classes.mainChart} >
                {
                    <div className={classes.select} >
                        <select name='currency' value={pair} onChange={handleSelect} >
                            {currencies.map((cur,idx) => {
                                return <option key={idx} value={cur.id}>{cur.display_name}</option>
                            })}    
                        </select>
                    </div>
                }

                <CryptoDashboard price={price} data={pastData} />
            </div>
            </Hidden>

            <Hidden mdUp>
                <div className={classes.mainChartSm} >
                    {
                        <div className={classes.select} >
                            <select name='currency' value={pair} onChange={handleSelect} >
                                {currencies.map((cur,idx) => {
                                    return <option key={idx} value={cur.id}>{cur.display_name}</option>
                                })}    
                            </select>
                        </div>
                    }

                    <CryptoDashboard price={price} data={pastData} />
                </div>
            </Hidden>
       </>
    )
}

export default Chart
