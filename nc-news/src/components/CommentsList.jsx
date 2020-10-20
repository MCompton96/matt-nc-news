import React from 'react';
import * as api from '../API';
import CommentCard from './CommentCard';

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
    
    render() {
        const { isLoading, comments } = this.state;
        return (
            <main>
                <h2>Comments</h2>
                {isLoading ? <p>Page is Loading</p> : (
                    <>
                    {comments.map(comment => {
                        return (
                            <CommentCard {...comment} key={comment.comment_id}/>
                            
                        )
                    })}
                    </>
                )}
            </main>
        )
    }
}

export default CommentsList;