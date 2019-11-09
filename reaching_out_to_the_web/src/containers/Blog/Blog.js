import React, {Component} from "react";
import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import {Route, NavLink, Switch} from "react-router-dom";

class Blog extends Component {
    /*
    Setting activeClassName to "active" in the NavLink is redundant. This is just to showcase how to configure the appended CSS class
    You may also use activeStyle for inline styling, works just like the normal inline styling.
    */

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="active">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                //Examples which won't do anything in this app, simply for showcasing the configuration options
                                hash: "#submit",
                                search: "?quick-submit=true"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" exact component={NewPost}/>
                    <Route path="/posts" component={Posts}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;