import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = (props) => {
    return (
        <main>
            {props.articles.map(article => {
                return (
                    <ArticleCard {...article} key={article.article_id} />
                )
            })}
        </main>
    )
}

export default ArticleList;