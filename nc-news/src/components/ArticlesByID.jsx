import React from 'react';
import { Link } from '@reach/router';
import * as api from '../API';
import CommentsList from './CommentsList';
import Votes from './Votes';
import ErrorHandle from './Errors';

class ArticlesByID extends React.Component {
    state = {
        articleByID: {
            article_id: 0,
            body: '',
            title: '',
            topic: '',
            votes: 0,
            author: '',
            comment_count: 0,
        },
        isLoading: true,
        error: null
    }

    getArticle = (article_id) => {
        api
        .fetchArticleByID(article_id)
        .then(({ data }) => {
            this.setState({ articleByID: data.article, isLoading: false})
        })
        .catch(err => {
            this.setState({ error: true})
        })
    }

    componentDidMount() {
        this.getArticle(this.props.article_id);
    }

    render() {
        const { article_id, title, body, topic, votes, author, comment_count} = this.state.articleByID;

        if (this.state.error) return <ErrorHandle />
        
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
            <CommentsList article_id={article_id} comment_count={comment_count}/>
            </main>
                </>
            )}
        </>
        )
    }
}

export default ArticlesByID;