import React, {Component} from "react";
import "./Posts.css";
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        //The then-method waits until get-method is done returning the data before it is executed
        axios.get("/posts/").then(response => {

            //Slices the returned array down to the first twelve elements
            const posts = response.data.slice(0, 4);

            //Adds a hardcoded author to each object in the array
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: "Fredrik"
                }
            });

            this.setState({posts: updatedPosts});
        }).catch(error => {
            console.log(error);
        });
    }

    postClickedHandler = (id) => {
        //this.props.history.push({pathname: "/posts" + id});
        this.props.history.push("/posts/" + id)
    };

    render() {
        let posts = <p style={{textAlign: "center", color: "red", fontWeight: "bold"}}>Something went Wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={"/posts/" + post.id } key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postClickedHandler(post.id)}/>
                    //</Link>
                );
            });

            return (
                <div>
                    <section className="Posts">
                        {posts}
                    </section>
                    <Route path={this.props.match.url + "/:id"}  exact component={FullPost}/>
                </div>
            );
        }
    }
}

export default Posts;