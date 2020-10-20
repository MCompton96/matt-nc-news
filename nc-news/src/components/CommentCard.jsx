import React from 'react';

const CommentCard = (props) => {
    const { author, body} = props;
    return (
    <>
    <p>Posted by {author}</p>
    <p>{body}</p>
    </>
    )
}

export default CommentCard;