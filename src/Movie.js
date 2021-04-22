import React from 'react';
import Table from 'react-bootstrap/Table';

class Movie extends React.Component {
    render() {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Film</th>
                            <th>Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.movieData.map((film, index) => (
                            <tr key={index}>
                                <td>{film.title}</td>
                                <td>{film.overview}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
           </>
        )
    }
}

export default Movie;