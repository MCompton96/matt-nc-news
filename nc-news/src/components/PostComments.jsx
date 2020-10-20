import React from 'react';

class PostComments extends React.Component {
    state = {
        body: '',
        username: 'jessjelly'
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleCommentPost(this.state)
        this.setState({ body: '', username: 'jessjelly'})
    }

    handleInput = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    render() {
        const { body } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <p>Post your comment below</p>
                    <input 
                    required
                    value={body}
                    onChange={this.handleInput}
                    type="textarea"
                    placeholder="Write your comment here..."
                    />
                </label>
                <button type='submit'>Post</button>
            </form>
        ) 
    }
}

export default PostComments;