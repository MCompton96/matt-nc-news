import React from 'react';
import * as api from '../API';
import { Link } from '@reach/router';
import './NavBar.css';

class NavBar extends React.Component {
    
    state = {
        topics: [],
        isLoading: true,
        articles: []
    }

    getAllTopics = () => {
        api
        .fetchAllTopics()
        .then(({ data }) => {
            this.setState({ topics: data.topics, isLoading: false})
        })
    };

    getAllArticles = () => {
        api
        .fetchAllArticles()
        .then(({ data }) => {
            this.setState({ articles: data.articles})
        })
    }

    componentDidMount() {
        this.getAllTopics()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.newTopic !== this.props.newTopic) {
            this.getAllTopics()
        }
    }
    
    render() {
        const { topics, isLoading } = this.state;
        console.log(topics);
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">All Topics</Link>
                    </li>
                    {isLoading ? <p>Page is Loading</p> : (
                        <>
                        {topics.map(topic => {
                            return (
                                <li key={topic.slug}>
                                    <Link to={`/topics/${topic.slug}`}>
                                    {topic.slug}    
                                    </Link>
                                </li>
                            )
                        })}
                        </>
                    )}
                </ul>
            </nav>
        )
    }
}

export default NavBar;