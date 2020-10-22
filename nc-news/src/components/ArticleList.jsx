import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleList.css';

const ArticleList = (props) => {
    return (
        <main className="list">
            {props.articles.map(article => {
                return (
                    <ArticleCard {...article} key={article.article_id} handleDelete={props.handleDelete} />
                )
            })}
        </main>
    )
}

export default ArticleList;