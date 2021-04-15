import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = React.createRef(); //not sure that this line is doing?
    }
    //this function will handle the data entered into the text box by the user. event prevent default prevents the page from refreshing after the user submits the datat
    handleSubmittedForm = (event) => {
        event.preventDefault();
        //this.props... passes the property of the parent APP of handleSearch into the child Search.js.
        this.props.handleSearch(this.textInput.current.value)
    }
    //The render function is used to display the form and text input box in the browser window.
    render() {
        return (
            <form onSubmit={this.handleSubmittedForm}>
                <input type="text" placeholder="City Name" ref={this.textInput} />
                <input onClick={this.props.hideError}type="submit" value="Explore!"/>
            </form>
        )
    }
}

export default Search;