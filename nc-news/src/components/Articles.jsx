import React from 'react';
import * as api from '../API';
import ArticleList from './ArticleList';
import PostArticle from './PostArticle';
import ErrorHandle from './Errors';
import SortBar from './SortBar';

class Articles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        topics: [],
        error: null, 
        sort_by: null
    }

    getAllArticles = () => {
        api
        .fetchAllArticles(
            this.props.topic,
            this.props.author,
            this.state.sort_by
        )
        .then(({ data }) => {
            this.setState({ articles: data.articles, isLoading: false })
        })
        .catch(err => {
            this.setState({ error: err.response, isLoading: false})
        })
    }

    getAllTopics = () => {
        api
        .fetchAllTopics()
        .then(({ data }) => {
            this.setState({ topics: data.topics })
        })
        .catch(err => {
            this.setState({ error: err.response, isLoading: false})
        })
    }

    componentDidMount() {
        this.getAllArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic ||
            prevState.sort_by !== this.state.sort_by) {
            this.getAllArticles();
        }
    }

    handleDelete = (article_id) => {
        api
        .removeArticle(article_id)
        .then(() => {
            this.getAllArticles();
        })
    }

    addNewTopic = () => {
        this.getAllTopics()
    }

    postAnArticle = (objectToPost) => {
        api
        .postArticle(objectToPost)
        .then(() => {
            this.getAllArticles();
        })
        .catch(err => {
            this.setState({ error: err.response, isLoading: false})
        })
    }

    handleSort = (query) => {
        this.setState({sort_by: query, isLoading: false})
    }

    render() {
        const { articles, isLoading, topics, error } = this.state;
        return (  <div>

            <SortBar handleSort={this.handleSort} />
            {error ? <ErrorHandle msg={error.data.msg} status={error.status}/> : null}
            {isLoading ? <p>Page is Loading</p> : 
                 (
                     <>
                     <ArticleList articles={articles} handleDelete={this.handleDelete}/>
                     <h2>Post a new article</h2>
                     <PostArticle postAnArticle={this.postAnArticle} addNewTopic={this.addNewTopic} topics={topics}/>
                    </>
                     )        
                    }
        </div>
        )

    }
}

export default Articles;