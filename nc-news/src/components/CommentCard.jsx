import React from 'react';
import Votes from './Votes';

const CommentCard = (props) => {
    const { author, body, votes, comment_id, handleDelete} = props;
    return (
    <>
    <p>Posted by {author}</p>
    <p>{body}</p>
    <Votes votes={votes} id={comment_id} comment={true}/>
    <p><button id={comment_id} handleDelete={handleDelete}>Delete Comment</button></p>
    </>
    )
}

export default CommentCard;