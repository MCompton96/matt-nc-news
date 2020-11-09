import React from 'react';
import './PostArticle.css';

class PostArticle extends React.Component {
    state = {
        title: '',
        username: 'jessjelly',
        topic: '',
        body: '',
        newTopic: false,
        noContent: false
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (value !== 'newTopic') {
            this.setState({ [name]: value, username: 'jessjelly' })
        } else {
            this.handleNewTopic()
        }
    }

    handleNewTopic = (event) => {
        this.setState({ newTopic: true, topic: ''})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, title, body, topic } = this.state;
        if (!title || !body) {
            this.setState({noContent: true})
        } else {
            this.props.postAnArticle({ username, body, title, topic });
            this.setState({ title: '', body: '', username: 'jessjelly', topic: '', noContent: false});
            this.props.addNewTopic();
            this.props.addANewTopicToNavBar();
        }
    }

    render() {
        const { title, body, newTopic, noContent } = this.state;

        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit} className="form">
                <h2 className="post-article-title">Post a new article</h2>
                    <p>
                    <label>
                        <span className="label">Title:</span>
                        <input 
                        type="text" 
                        onChange={this.handleChange}
                        className="input"
                        value={title}
                        name="title"
                        placeholder="Article title..."
                        />
                    </label>
                    </p>
                    <p>
                    <label >
                        <span className="label">Topic:</span>
                        <select name="topic" onChange={this.handleChange} defaultValue="initial" className="input">
                            <option value="initial" disabled>Select topic or create a new one...</option>
                            {this.props.topics.map(topic => {
                                return (
                                <option key={topic.slug} name={topic.slug} value={topic.slug}>{topic.slug}</option>
                                )
                            })}
                            <option value="newTopic">Create new topic</option>
                        </select>
                    </label>
                    </p>
                    <p>
                    {newTopic && (
                        <label>
                            <span className="label">New Topic:</span>
                            <input type="text" name="topic" onSelect={this.handleChange} className="input"/>
                        </label>
                    )}
                    </p>
                    <p>
                    <label>
                        <span className="label">Article Content:</span>
                        <textarea name="body" value={body} placeholder="Write Article here..." rows="12" onChange={this.handleChange} className="input"/>
                    </label>
                    </p>
                    <p>
                    <button type="submit" className="submit-button">Post Article</button>
                    <p>{noContent ? <h2 className="article-error-message">Cannot submit article without content</h2> : null}</p>
                    </p>
                </form>
            </div>
        )
    }
}

export default PostArticle;