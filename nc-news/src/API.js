import axios from 'axios';

const API = axios.create({
    baseURL: 'https://matt-northcoder-news.herokuapp.com/api'
});

export const fetchAllTopics = () => {
    return API.get('/topics')
};

export const fetchAllArticles = (topic, author) => {
    return API.get('/articles', {
        params: {
            topic, author
        }
    })
};

export const fetchArticleByID = (article_id) => {
    return API.get(`/articles/${article_id}`);
}