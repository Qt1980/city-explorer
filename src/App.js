import React from 'react';
import './App.css';

import axios from 'axios';
import Error from './'
import City from './City.js'
import Weather from './Weather.js';
import Search from './Search.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alreadySearched: false, //this line indicates whether the city has been searched by the user
            searchedCity: '', //this line indicates the city that a user wants to search.
            error: {},
        };
    }

    hideError = () => {
        this.setState({ error: {} };)
    }

    //The handleShowSearch function set the state of the APP constructor to false under applicable situations
    handleShowSearch = () => {
        this.setState({ alreadySearched: false });
    }
    //The handleSearch function is being passed into Search.js child component. It console logs the searched city and then gets the locationIQ key used as an access token in order to request location data from the locationIQ API.
    handleSearch = async (searchedCity) => {
        console.log('search', searchedCity);

        try {
          let locationAnswerData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${searchedCity}&format=json`);
          console.log(locationAnswerData);

          this.setState({
            alreadySearched: true,
            searchedCity: searchedCity,
            locationData: locationAnswerData.data[0]
         });
        } catch (err) {
            console.log(`We have an error: ${err}`);
            this.setState({error: err});
        }
        this.getForecastData();
    }

    //this function is getting the weather data from a weather API from lab 07.
    getForecastData = async() => {
        const forecastData = await axios.get('url from weather api')
        this.setState({
            forecastData: forecastData.data
        })
    }

    render() {
        return (
            <>
            
             <h1>City Explorer</h1>
             {this.state.error.message ? <Error errorState={this.state.error} hideError={this.hideError} /> : ''}

             {this.state.alreadySearched ?
             <>
             
              <City handleShowSearch={this.handleShowSearch} cityData={this.state.locationData} errorState={this.state.error}/>
              <Weather forecastData={this.state.forecastData} />
             </>
             : <Search handleSearch={this.handleSearch} hideError={this.hideError} />}
             <button onClick={this.handleShowSearch}>Search Again</button> :
            </>
        );
    }
}


export default App;