import React, {Component} from "react";
import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import {Route, NavLink} from "react-router-dom";

class Blog extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="Blog">
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName="active">Home</NavLink></li>
                            /*
                            Setting activeClassName to "active" is redundant. This is just to showcase how to configure the appended CSS class
                            You may also use activeStyle for inline styling, works just like the normal inline styling. 
                             */
                            <li><NavLink to={{
                                pathname: "/new-post",
                                //Examples which won't do anything in this app, simply for showcasing the configuration options
                                hash: "#submit",
                                search: "?quick-submit=true"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" exact component={NewPost}/>
            </div>
        );
    }
}

export default Blog;