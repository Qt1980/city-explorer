import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = React.createRef();
    }
    handleSubmittedForm = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.textInput.current.value)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmittedForm}>
                <input type="text" red={this.textInput} />
                <input type="submit" />
            </form>
        )
    }
}

export default Search;