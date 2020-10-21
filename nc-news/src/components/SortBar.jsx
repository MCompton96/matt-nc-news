import React from 'react';

class SortBar extends React.Component {
    
    state = {
        sort_by: ''
    }

    handleClick = (event) => {
        const value = event.target.value;
        this.setState({ sort_by: value}, () => {
            this.props.handleSort(this.state.sort_by)
        })
    } 
    
    render() {
        return (
            <main>
                <button value="comment_count" onClick={this.handleClick}>
                    Hottest
                </button>
                <button value="created_at" onClick={this.handleClick}>
                    Newest
                </button>
                <button value="votes" onClick={this.handleClick}>
                    Most Popular
                </button>
            </main>
        )
    }
}

export default SortBar;