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