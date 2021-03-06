import React, {Component} from 'react';
import './FullPost.css';
import axios from "axios";

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidMount(prevProps, prevState, snapshot) {
        this.loadData();
    }

    deletePostHandler = () => {
        axios.delete("/posts/" + this.props.match.params.id).then(response => {
            console.log(response);
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) { //The pluss-sign converts this.props.match.params.id from a String to a number!
                axios.get("/posts/" + this.props.match.params.id).then(response => {
                    this.setState({loadedPost: response.data});
                });
            }
        }
    }


    render() {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if (this.props.match.params.id) {
            post = <p style={{textAlign: "center"}}>Loading..!</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;