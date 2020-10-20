import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = (props) => {
    const { article_id, title, body, topic, author, created_at } = props;
    return (
    <div>
        <Link to={`/articles/${article_id}`}>{title}</Link>
        <p>{body}</p>        
    </div>
    )
}

export default ArticleCard;