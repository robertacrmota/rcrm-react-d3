import React from 'react';
import Scatterplot from '../d3/Scatterplot';

class ScatterplotWrapper extends React.Component {
    scatterplotRef = null;
    scatterplot = null;

    constructor(props) {
        super(props);
        this.scatterplotRef = React.createRef();
    }

    componentDidMount() {
        this.scatterplot = new Scatterplot(this.scatterplotRef, this.props.data);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data) {
            this.scatterplot.update(nextProps.data);
        }

        //if (nextProps.hovered_data) {
            this.scatterplot.updateHover(nextProps.hovered_data);
        //}
    }

    render() {
        return (
            <div ref={this.scatterplotRef} />
        );
    }
}

export default ScatterplotWrapper;