import React, {Component} from "react";
import './Blog.css';
import Posts from "./Posts/Posts";
import asyncComponent from "../../higherOrderComponents/asyncComponent";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";

//Makes sure the NewPost component is only loaded when needed, as in this enables lazy loading of NewPost.
const AsyncNewPost = asyncComponent(() => {
    return import("./NewPost/NewPost");
});

class Blog extends Component {
    state = {
        auth: true
    };

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
                            {/*
                            Setting activeClassName to "active" in the NavLink is redundant. This is just to showcase how to configure the appended CSS class
                            You may also use activeStyle for inline styling, works just like the normal inline styling.
                            */}
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
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost}/> : null} {/*Example on how to use a guard (in combination with the <Redirect from="/" to="/posts" />). Set auth to false to block access */}
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not Found</h1>}/> {/* This will catch any unknown route and render whatever you want. Will not be triggered if a redirect similar to the one below is active */}
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;