import React from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';

const ArticleCard = (props) => {
    const { article_id, title, body, topic, author, created_at, votes, handleDelete } = props;
    return (
    <div>
        <Link to={`/articles/${article_id}`}>{title}</Link>
        <p>{body}</p> 
        <span><Votes votes={votes} id={article_id} article={true}/></span>
        <p><button onClick={() => {
            handleDelete(article_id)
        }}>Delete Article</button></p>       
    </div>
    )
}

export default ArticleCard;