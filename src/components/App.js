import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScatterplotWrapper from "./ScatterplotWrapper";
import LineChartWrapper from "./LineChartWrapper";

import Table from './Table';
import birthData from '../birthData';
import './App.css';

class App extends React.Component {
  state = {data: birthData, hovered_data: null};

  onTableEntrySubmit = (entry_data) => {
      let updated_data = [...this.state.data, { region: entry_data.region,
                                                births: entry_data.births_capita,
                                                population: 1,
                                                lifeExpectancy: entry_data.lifeExpectancy}];
      this.setState({data: updated_data});
  };

  onTableEntryDelete = (entry_data) => {
      let updated_data = this.state.data.filter((d) => d.region !== entry_data.region);
      this.setState({data: updated_data});
  };

  onTableEntryHover = (entry_data) => {
      this.setState({hovered_data: entry_data});
  };

    onTableEntryUnhover = () => {
        this.setState({hovered_data: null});
  };

    render() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#">React-D3</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col xs={12} md={7}>
                        <div>
                            <ScatterplotWrapper data={this.state.data} hovered_data={this.state.hovered_data}/>
                            {/*<LineChartWrapper data={this.state.data}/>*/}
                        </div>
                    </Col>
                    <Col xs={12} md={5}>
                        <Table data={this.state.data}
                               onTableEntrySubmit={this.onTableEntrySubmit}
                               onTableEntryHover={this.onTableEntryHover}
                               onTableEntryUnhover={this.onTableEntryUnhover}
                               onTableEntryDelete={this.onTableEntryDelete} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

export default App;
