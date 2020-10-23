import React from 'react';
import * as api from '../API';
import CommentCard from './CommentCard';
import PostComments from './PostComments';

class CommentsList extends React.Component {
    state = {
        comments: [],
        isLoading: true
    }

    getAllComments = () => {
        api.fetchCommentsByArticleID(this.props.article_id)
        .then(({ data }) => {
            this.setState({ comments: data.comments, isLoading: false})
        })
    }

    componentDidMount() {
        this.getAllComments()
    }

    handleDelete = (id) => {
        api
        .removeComment(id)
        .then(() => {
            this.getAllComments();
        })
    }

    handleCommentPost = (objectToPost) => {
        api
        .postComment(objectToPost, this.props.article_id)
        .then(({ data }) => {
            this.setState(currentState => {
                return { comments: [data.comment, ...currentState.comments]}
            })
        })
    }
    
    render() {
        const { isLoading, comments } = this.state;
        const { comment_count } = this.props;
        return (
            <main>
                <h2>Comments ({comment_count})</h2>
                {isLoading ? <p>Page is Loading</p> : (
                    <>
                    <PostComments handleCommentPost={this.handleCommentPost} />
                    {comments.map(comment => {
                        return (
                            <CommentCard 
                            {...comment} 
                            key={comment.comment_id} 
                            handleDelete={this.handleDelete}
                            />
                        )
                    })}
                    </>
                )}

            </main>
        )
    }
}

export default CommentsList;