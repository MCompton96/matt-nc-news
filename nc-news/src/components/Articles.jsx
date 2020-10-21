import React from 'react';
import * as api from '../API';
import ArticleList from './ArticleList';
import PostArticle from './PostArticle';

class Articles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        topics: []
    }

    getAllArticles = () => {
        api
        .fetchAllArticles(
            this.props.topic,
            this.props.author
        )
        .then(({ data }) => {
            this.setState({ articles: data.articles, isLoading: false })
        })
    }

    getAllTopics = () => {
        api
        .fetchAllTopics()
        .then(({ data }) => {
            this.setState({ topics: data.topics })
        })
    }

    componentDidMount() {
        this.getAllArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
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
    }

    render() {
        const { articles, isLoading, topics } = this.state;
        return (  <div>
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