import React from 'react';
import { Link } from '@reach/router';
import * as api from '../API';
import CommentsList from './CommentsList';
import Votes from './Votes';
import ErrorHandle from './Errors';
import moment from "moment";
import './ArticlesByID.css';

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
            created_at: ''
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
        const { article_id, title, body, topic, votes, author, comment_count, created_at} = this.state.articleByID;

        if (this.state.error) return <ErrorHandle />
        
        return (
            <>
            {this.state.isLoading ? <p>Page is Loading</p> : (
            <>
            <div className="article-container">
            <main className="article">
            <h2 className="article-title">{title}</h2>
            <p className="article-body">{body}</p>
            <span><Votes votes={votes} id={article_id} article={true} className="article-vote"/></span>
            <p className="article-timestamp">
            Article was posted in&nbsp;        
            <Link to={`topics/${topic}`}>{topic}</Link>
            &nbsp;on {moment(created_at).format('LLLL')}
            &nbsp;by <Link to={`/${author}/articles`}>{author}</Link>
            </p>
            <span className="article-comments">
            <CommentsList article_id={article_id} comment_count={comment_count} />
            </span>
            </main>
            </div>
                </>
            )}
        </>
        )
    }
}

export default ArticlesByID;