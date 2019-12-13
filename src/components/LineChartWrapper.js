import React from 'react';
import LineChart from '../d3/LineChart';

class LineChartWrapper extends React.Component {
    lineChart_ref;
    lineChart;

    constructor(props) {
        super(props);
        this.lineChart_ref = React.createRef();
    }

    componentDidMount() {
        this.lineChart = new LineChart(this.lineChart_ref, this.props.data);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data) {
            this.lineChart.update(nextProps.data);
        }
    }

    render() {
        return (
            <div ref={this.lineChart_ref} />
        );
    }
}

export default LineChartWrapper;