import React from 'react';
import './DeleteComment.css';

const DeleteComment = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.handleDelete(props.comment_id)
            }} className="comment-delete-button">
                Delete Comment
            </button>
        </div>
    )
}

export default DeleteComment;