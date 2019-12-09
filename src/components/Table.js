import React from 'react';
import Container from 'react-bootstrap/Container';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './Table.css';

class Table extends React.Component {

    onRowSubmit = (row_data) => {
        this.props.onTableEntrySubmit(row_data);
    };

    onRowDelete = (row_data) => {
        this.props.onTableEntryDelete(row_data);
    };

    onRowHover = (row_data) => {
        this.props.onTableEntryHover(row_data);
    };

    onRowUnhover = () => {
        this.props.onTableEntryUnhover();
    };

    render() {
        return (
            <Container className="table-container">
                <TableHeader onRowSubmit={this.onRowSubmit}/>
                <br/>
                {this.props.data.map((d) => <TableRow key={d.region}
                                                      data={d}
                                                      onRowHover={this.onRowHover}
                                                      onRowUnhover={this.onRowUnhover}
                                                      onRowDelete={this.onRowDelete}/>)}
            </Container>
        );
    }
}

export default Table;