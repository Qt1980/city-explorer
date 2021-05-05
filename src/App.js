import React from 'react';
import './App.css';

import axios from 'axios';
import Error from './Error.js';
import City from './City.js';
import Weather from './Weather.js';
import Movie from './Movie.js';
import Search from './Search.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alreadySearched: false, //this line indicates whether the city has been searched by the user
            searchedCity: '', //this line indicates the city that a user wants to search.
            error: {},
            movieData: []
        };
    }

    hideError = () => {
        this.setState({ error: {} });
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

        //   this.getForecastData();
        const forecastData = await axios.get(`http://localhost:3002/weather?lat=${locationAnswerData.data[0].lat}&lon=${locationAnswerData.data[0].lon}`)

          this.setState({
            alreadySearched: true,
            searchedCity: searchedCity,
            locationData: locationAnswerData.data[0],
            forecastData: forecastData.data

         });

         const movieData = await axios.get(`http://localhost:3002/movies?city=${this.state.searchedCity}`);
         console.log(movieData.data)

         this.setState({
             movieData: movieData.data
         })
         console.log('movies in state', this.state.movieData)
        } catch (err) {
            console.log(`We have an error: ${err}`);
            this.setState({error: err});
        }
    }

    
    //this function is getting the weather data from a weather API from lab 07.
    getForecastData = async() => {
        const forecastData = await axios.get('http://localhost:3002/weather')
        this.setState({
            forecastData: forecastData.data //ask about why this line needed to be placed above at line 45 which somehow connect to line 11 app.use(cors()) and line 2 in the front end server.js file.
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
              <Movie movieData={this.state.movieData} />
             </>
             : <Search handleSearch={this.handleSearch} hideError={this.hideError} />}
             
            </>
        );
    }
}


export default App;