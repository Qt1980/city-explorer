import React from 'react';
import './App.css';

import axios from 'axios';
import Search from './Search.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            alreadySearched: false,
            searchedCity: '',
        };
    }
    handleShowSearch = () => {
        this.setState({alreadySearched: false});
    }
    handleSearch = async(searchedCity) => {
        console.log('search', searchedCity);
        this.setState({
            alreadySearched: true,
            searchedCity: searchedCity
        });

        let locationAnswerData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${searchedCity}&format=json`);
        console.log(locationAnswerData);
        
    }
    render () {
        return(
            <>
            <h1>City Explorer</h1>
            {this.state.alreadySearched ?
            <button onClick={this.handleShowSearch}>Search Again</button> :
            <Search handleSearch={this.handleSearch} />}
            </>
        );
    }
}


export default App;