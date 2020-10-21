import React from 'react';

class PostArticle extends React.Component {
    state = {
        title: '',
        username: 'jessjelly',
        topic: '',
        body: '',
        newTopic: false
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
        this.props.postAnArticle({ username, body, title, topic });
        this.setState({ title: '', body: '', username: 'jessjelly', topic: ''});
        this.props.addNewTopic();
        this.props.addANewTopicToNavBar();
    }

    render() {
        const { title, username, topic, body, newTopic } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                    <label>
                        <span>Title:</span>
                        <input 
                        type="text" 
                        onChange={this.handleChange}
                        value={title}
                        name="title"
                        placeholder="Article title..."
                        />
                    </label>
                    </p>
                    <p>
                    <label >
                        <span>Topic:</span>
                        <select name="topic" onChange={this.handleChange} defaultValue="initial">
                            <option value="initial" disabled>Select topic or create a new one...</option>
                            {this.props.topics.map(topic => {
                                return (
                                <option key={topic.slug}>{topic.slug}</option>
                                )
                            })}
                            <option value="newTopic">Create new topic</option>
                        </select>
                    </label>
                    </p>
                    <p>
                    {newTopic && (
                        <label>
                            <span>New Topic:</span>
                            <input type="text" name="topic" onSelect={this.handleChange}/>
                        </label>
                    )}
                    </p>
                    <p>
                    <label>
                        <span>Article Content:</span>
                        <textarea name="body" value={body} placeholder="Write Article here..." rows="12" onChange={this.handleChange}/>
                    </label>
                    </p>
                    <p>
                    <button type="submit">Post Article</button>
                    </p>
                </form>
            </div>
        )
    }
}

export default PostArticle;