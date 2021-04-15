import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class City extends React.Component {
    render() {
        return (
            <>
             <Jumbotron>
                 <h2>Result: {this.props.cityData.display_name}</h2>
                 <p>Latitude: {this.props.cityData.lat}</p>
                 <p>Longitude: {this.props.cityData.lon}</p>
                 <p>
                 <Button onClick={this.handleShowSearch}>Search Again</Button>
                 </p>
                 <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=12`} alt="map"/>
             </Jumbotron>
            </>
        )
    }
}

export default City;