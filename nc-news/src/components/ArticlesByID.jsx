import React from 'react';
import { Link } from '@reach/router';
import * as api from '../API';
import CommentsList from './CommentsList';
import Votes from './Votes';

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
            <span><Votes votes={votes} id={article_id} article={true}/></span>
            <p>
            Article was posted in&nbsp;        
            <Link to={`topics/${topic}`}>{topic}</Link>
            </p>
            <CommentsList article_id={article_id}/>
            </main>
                </>
            )}
        </>
        )
    }
}

export default ArticlesByID;