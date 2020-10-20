import React from 'react';
import * as api from '../API';
import ArticleList from './ArticleList';

class Articles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        topics: []
    }

    getAllArticles = () => {
        api
        .fetchAllArticles(
            this.props.topic,
            this.props.author
        )
        .then(({ data }) => {
            this.setState({ articles: data.articles, isLoading: false })
        })
    }

    getAllTopics = () => {
        api
        .fetchAllTopics()
        .then(({ data }) => {
            this.setState({ topics: data.topics })
        })
    }

    componentDidMount() {
        this.getAllArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
            this.getAllArticles();
        }
    }

    handleDelete = (article_id) => {
        api
        .removeArticle(article_id)
        .then(() => {
            this.fetchAllArticles();
        })
    }

    render() {
        const { articles, isLoading } = this.state;
        return (  <div>
            {isLoading ? <p>Page is Loading</p> : 
                 (
                    <ArticleList articles={articles} handleDelete={this.handleDelete}/>
            )        
        }
        </div>
        )
    }
}

export default Articles;