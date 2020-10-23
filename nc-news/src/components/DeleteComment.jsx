import React from 'react';

const DeleteComment = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.handleDelete(props.comment_id)
            }}>
                Delete Comment
            </button>
        </div>
    )
}

export default DeleteComment;