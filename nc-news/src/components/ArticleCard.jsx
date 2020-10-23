import React from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';
import moment from 'moment';
import './ArticleCard.css';

const ArticleCard = (props) => {
    const { article_id, title, body, author, created_at, votes, handleDelete } = props;
    return (
    <div className="article-cards">
        <span className="container">
        <Link to={`/articles/${article_id}`} className="title">{title}</Link>
    <p className="timestamp">Posted on {moment(created_at).format('LLLL')} by <Link to={`/${author}/articles`}>{author}</Link></p>        
        <p class="body">{body}</p> 
        </span>
        <span><Votes votes={votes} id={article_id} article={true} className="votes"/></span>
        <p class="delete-container"><button onClick={() => {
            handleDelete(article_id)
        }} className="delete-button">Delete Article</button></p>       
    </div>
    )
}

export default ArticleCard;