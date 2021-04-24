import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    dashboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px'
    },
    chartContainer: {
        width: '80%',
        height: '100%'
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
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className={classes.dashboard}>
      <h2>{`$${price}`}</h2>

      <div className={classes.chartContainer}>
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default CryptoDashboard;