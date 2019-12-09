import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TableRow extends React.Component {

    onClick = () => {
        this.props.onRowDelete(this.props.data);
    };

    onMouseEnter = () => {
        this.props.onRowHover(this.props.data);
    };

    onMouseLeave = () => {
        this.props.onRowUnhover();
    };

    render() {
        return (
            <Row className="table-row" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <Col xs={3}>
                    {this.props.data.region}
                </Col>
                <Col xs={3}>
                    {(this.props.data.births / this.props.data.population).toFixed(2)}
                </Col>
                <Col xs={4}>
                    {this.props.data.lifeExpectancy}
                </Col>
                <Col xs={2}>
                    <i className="table-row-delete-icon far fa-trash-alt" onClick={this.onClick}/>
                </Col>
            </Row>
        );
    }
}

export default TableRow;