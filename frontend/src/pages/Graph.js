import {React, useEffect} from "react";
import "../App.css";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import {Button} from 'react-bootstrap';

function Graph () {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-yield-monitoring-system-dfmdn",
    showAttribution: false
  });
  const Chart = sdk.createChart({
    chartId: "62c42058-6bc4-44f5-8f4d-15b909ee1ba6"
  });
  const refresh = () => {
    Chart.refresh();
  };
  useEffect(() => {
    Chart.render(document.getElementById("chart-data"));
  }, []);
 
  return(
  <>
    <div id="chart-data" style={{ height: 500 }}></div>
    <div className="centerButton">
      <Button variant="success" style={{ marginBottom: "20px"}} onClick={() => refresh()}>Refresh</Button>
    </div>
  </>
  );
}

export default Graph;