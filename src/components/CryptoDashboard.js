import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {Hidden, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    dashboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px',
        width: '1000px'
    },
    chartContainer: {
        width: '80%',
        height: '100%'
    },
    dashboardSm: {
      display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px',
        width: '100%',
    },
    chartContainerSm: {
      width: '300px',
      height: '300px',
    }
});

function CryptoDashboard({ price, data }) {
    const classes = useStyles();
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  if (price === "0.00") {
    return (
    <>
    <Hidden smDown>
       <h2 style={{textAlign: 'center', fontWeight: 'bold', color: '#012241'}} >Please select a currency pair</h2>
    </Hidden>
    <Hidden mdUp>
       <h2 style={{textAlign: 'center', fontWeight: 'bold', color: '#012241', fontSize: '20px'}} >Please select a currency pair</h2>
    </Hidden>

      </>
    )
  }
  return (
    <>
        <Hidden smDown>
          <div className={classes.dashboard}>
            <h2 style={{fontWeight: 'bold', color: '#012241'}} >{`$${price}`}</h2>

            <div className={classes.chartContainer}>
              <Line data={data} options={opts} />
            </div>
          </div>
        </Hidden>

        <Hidden mdUp>
          <div className={classes.dashboardSm}>
            <h2 style={{fontWeight: 'bold', color: '#F6CD2D'}} >{`$${price}`}</h2>

            <div className={classes.chartContainerSm}>
              <Line data={data} options={opts} />
            </div>
            {/* <div><h4 style={{color: 'white', marginTop: '30px' }} >Developer's working on the Live bar chart!</h4></div> */}
          </div>
        </Hidden>
    </>
  );
}

export default CryptoDashboard;