import GaugeChart from 'react-gauge-chart'

function GaugeProg(props) {

  const chartStyle = {
		height: 250,
	}
  
  return (
    <GaugeChart
    style={chartStyle}
    nrOfLevels={30}
    colors={['#FF5F6D', '#FFC371']}
    arcWidth={0.3}
    percent={props.percent}
  />
  );
}

export default GaugeProg;