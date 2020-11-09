import React from 'react';
import * as api from '../API';
import ArticleList from './ArticleList';
import PostArticle from './PostArticle';
import ErrorHandle from './Errors';
import SortBar from './SortBar';
import './Articles.css';

class Articles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        topics: [],
        error: null, 
        sort_by: null,
        page: 1
    }

    getAllArticles = () => {
        api
        .fetchAllArticles(
            this.props.topic,
            this.props.author,
            this.state.sort_by,
            this.state.page
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
        this.getAllTopics();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic ||
            prevState.sort_by !== this.state.sort_by ||
            prevState.page !== this.state.page) {
            this.getAllArticles();
        }
    }

    changePage = (pageAdjustment) => {
        this.setState(currentState => {
            return { page: currentState.page + pageAdjustment};
        });
    };

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
        const { articles, isLoading, topics, error, page } = this.state;
        return (  <div>

            <SortBar handleSort={this.handleSort} />
            {error ? <ErrorHandle msg={error.data.msg} status={error.status}/> : null}
            {isLoading ? <p>Page is Loading</p> : 
                 (
                     <>
                     <div className="button-container">
                        <button onClick={() => {
                         this.changePage(-1)
                     }} className="button-pages">Previous Page</button>
                        <span className="page-span"><h4>Page {page}</h4></span>
                        <button onClick={() => {
                         this.changePage(1)
                     }} className="button-pages">Next Page</button>
                     </div>
                     <ArticleList articles={articles} handleDelete={this.handleDelete}/>
                     <div className="bottom-button-container">
                     <button onClick={() => {
                         this.changePage(-1)
                     }} className="button-pages">Previous Page</button>
                     <button onClick={() => {
                         this.changePage(1)
                     }} className="button-pages">Next Page</button>
                     </div>
                     <PostArticle postAnArticle={this.postAnArticle} addNewTopic={this.addNewTopic} topics={topics} addANewTopicToNavBar={this.props.addANewTopicToNavBar}/>
                    </>
                     )        
                    }
        </div>
        )

    }
}

export default Articles;