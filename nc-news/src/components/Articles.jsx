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
                     <div>
                         <span><button onClick={() => {
                         this.changePage(-1)
                     }}>Previous Page</button></span>
                     <span><h4>Page {page}</h4></span>
                     <span><button onClick={() => {
                         this.changePage(1)
                     }}>Next Page</button></span>
                     </div>
                     <ArticleList articles={articles} handleDelete={this.handleDelete}/>
                     <button onClick={() => {
                         this.changePage(-1)
                     }}>Previous Page</button>
                     <button onClick={() => {
                         this.changePage(1)
                     }}>Next Page</button>
                     <h2>Post a new article</h2>
                     <PostArticle postAnArticle={this.postAnArticle} addNewTopic={this.addNewTopic} topics={topics} addANewTopicToNavBar={this.props.addANewTopicToNavBar}/>
                    </>
                     )        
                    }
        </div>
        )

    }
}

export default Articles;