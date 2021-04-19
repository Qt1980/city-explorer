import React from 'react';
import Table from 'react-bootstrap/Table';

class Weather extends React.Component {
    render() {
        console.log(this.props);
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.forecastData.map((day, index) => (
                        <tr key={index}>
                          <td>{day.date}</td>
                          <td>{day.description}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>            
            </>
        )
    }
}

export default Weather;