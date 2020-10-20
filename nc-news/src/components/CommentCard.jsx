import React from 'react';
import Votes from './Votes';

const CommentCard = (props) => {
    const { author, body, votes, comment_id} = props;
    return (
    <>
    <p>Posted by {author}</p>
    <p>{body}</p>
    <Votes votes={votes} id={comment_id} comment={true}/>
    </>
    )
}

export default CommentCard;