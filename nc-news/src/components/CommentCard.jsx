import React from 'react';
import Votes from './Votes';
import moment from 'moment';
import { Link } from '@reach/router';

const CommentCard = (props) => {
    const { author, body, votes, comment_id, handleDelete, created_at} = props;
    return (
    <>
    <p>Posted by <Link to={`/${author}/articles`}>{author}</Link> on {moment(created_at).format('LLLL')}</p>
    <p>{body}</p>
    <Votes votes={votes} id={comment_id} comment={true}/>
    <p><button id={comment_id} handleDelete={handleDelete}>Delete Comment</button></p>
    </>
    )
}

export default CommentCard;