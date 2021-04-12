import React from 'react';
import axios from 'axios';
import './App.css';
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
    handleSearch = (searchedCity) => {
        console.log('search', searchedCity);
        this.setState({
            alreadySearched: true,
            searchedCity: searchedCity
        });
        let locationAnswerData = await axios.get('');
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