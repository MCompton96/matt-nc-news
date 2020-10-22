import React from 'react';
import './SortBar.css';

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
            <main className="sort-bar">
                <button value="comment_count" onClick={this.handleClick} className="button">
                    Hottest
                </button>
                <button value="created_at" onClick={this.handleClick} className="button">
                    Newest
                </button>
                <button value="votes" onClick={this.handleClick} className="button">
                    Most Popular
                </button>
            </main>
        )
    }
}

export default SortBar;