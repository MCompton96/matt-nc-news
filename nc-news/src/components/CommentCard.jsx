import React from 'react';
import Votes from './Votes';
import moment from 'moment';
import { Link } from '@reach/router';
import DeleteComment from './DeleteComment';
import './CommentCard.css';

const CommentCard = (props) => {
    const { author, body, votes, comment_id, handleDelete, created_at} = props;
    return (
    <main className="comment-container">
    <>
    <p className="comment-timestamp">Posted by <Link to={`/${author}/articles`}>{author}</Link> on {moment(created_at).format('LLLL')}</p>
    <span className="content-container">
    <p className="comment-body">{body}</p>
    <Votes votes={votes} id={comment_id} comment={true} className="comment-votes"/>
    </span>
    <p><DeleteComment handleDelete={handleDelete} comment_id={comment_id} className="comment-delete"/></p>
    </>
    </main>
    )
}

export default CommentCard;