import React from 'react';

class PostArticle extends React.Component {
    state = {
        title: '',
        username: 'jessjelly',
        topic: '',
        body: '',
        newTopic = false
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (value !== 'newTopic') {
            this.setState({ [name]: value, username: 'jessjelly' })
        }
    }

    render() {
        const { title, username, topic, body } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                </form>
            </div>
        )
    }
}