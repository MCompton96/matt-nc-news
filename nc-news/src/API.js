import axios from 'axios';

const API = axios.create({
    baseURL: 'https://matt-northcoder-news.herokuapp.com/api'
});

export const fetchAllTopics = () => {
    return API.get('/topics')
};

export const fetchAllArticles = (topic, author, votes) => {
    return API.get('/articles', {
        params: {
            topic, author, votes
        }
    })
};

export const fetchArticleByID = (article_id) => {
    return API.get(`/articles/${article_id}`);
}

export const fetchCommentsByArticleID = (article_id) => {
    return API.get(`/articles/${article_id}/comments`);
}

export const patchArticleVote = (id, change) => {
    const vote = { inc_votes: change };
    return API.patch(`/articles/${id}`, vote)
}

export const patchCommentVote = (id, change) => {
    const vote = { inc_votes: change };
    return API.patch(`/comments/${id}`, vote)
}