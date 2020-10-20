import React from 'react';
import { Link } from '@reach/router';
import * as api from '../API';

class ArticlesByID extends React.Component {
    state = {
        articleByID: {
            article_id: 0,
            body: '',
            title: '',
            topic: '',
            votes: 0,
            author: ''
        },
        isLoading: true
    }

    getArticle = (article_id) => {
        api
        .fetchArticleByID(article_id)
        .then(({ data }) => {
            this.setState({ articleByID: data.article, isLoading: false})
        })
    }

    componentDidMount() {
        this.getArticle(this.props.article_id);
    }

    render() {
        const { article_id, title, body, topic, votes, author} = this.state.articleByID;

        return (
            <>
            {this.state.isLoading ? <p>Page is Loading</p> : (
            <>
            <main>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>
            Article was posted in&nbsp;        
            <Link to={`topics/${topic}`}>{topic}</Link>
            </p>
            <p>All Comments go here</p>
            </main>
                </>
            )}
        </>
        )
    }
}

export default ArticlesByID;