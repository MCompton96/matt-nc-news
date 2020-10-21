import React from 'react';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import * as api from '../API';

class Votes extends React.Component {
    state = {
        thumbUpClicked: false, 
        thumbDownClicked: false,
        voteChange: 0
    }

    voteChange = (id, change) => {
        if (this.props.article) {
            api
            .patchArticleVote(id, change)
            .catch(err => {
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange - 1
                    }
                })
            })
            this.setState(prevState => {
                return {
                    voteChange: prevState.voteChange + change
                }
            })
        }
        if (this.props.comment) {
            api
            .patchCommentVote(id, change)
            .catch(err => {
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange - 1
                    }
                })
            })
            this.setState(prevState => {
                return {
                    voteChange: prevState.voteChange + change
                }
            })
        }
    }

    render() {
        const { thumbUpClicked, thumbDownClicked, voteChange } = this.state;

        return (
            <div>
                <button onClick={() => {
                    if (!thumbUpClicked) {
                        this.voteChange(this.props.id, 1);
                        this.setState({thumbUpClicked: true})
                    }
                }}><ThumbUp style={{ fill: 'green'}}/></button>
                <button onClick={() => {
                    if (!thumbDownClicked) {
                        this.voteChange(this.props.id, -1);
                        this.setState({thumbDownClicked: true})
                    }
                }}><ThumbDown style={{ fill: 'red'}}/></button>
                <span>Votes: {this.props.votes + voteChange}</span>
            </div>
        )
    }
}

export default Votes;
