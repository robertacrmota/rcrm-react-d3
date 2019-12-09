import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TableHeader extends React.Component {
    state = {region: '', births_capita: '', lifeExpectancy: ''};

    onRowSubmit = () => {
        this.props.onRowSubmit(this.state);
        this.setState({region: '', births_capita: '', lifeExpectancy: ''});
    };

    render() {
        return (
            <Row className="table-header">
                <Col xs={3}>
                    <Form.Control type="text"
                                  placeholder="Country"
                                  value={this.state.region}
                                  onChange={(evt) => this.setState({region: evt.target.value})} />
                </Col>
                <Col xs={3}>
                    <Form.Control type="text"
                                  placeholder="Births/Capita"
                                  value={this.state.births_capita}
                                  onChange={(evt) => this.setState({births_capita: evt.target.value})} />
                </Col>
                <Col xs={4}>
                    <Form.Control type="text"
                                  placeholder="Life expectancy"
                                  value={this.state.lifeExpectancy}
                                  onChange={(evt) => this.setState({lifeExpectancy: evt.target.value})} />
                </Col>
                <Col xs={2}>
                    <Button variant="primary" type="submit" onClick={this.onRowSubmit}> Add </Button>
                </Col>
            </Row>
        );
    }
}

export default TableHeader;