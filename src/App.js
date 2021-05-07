import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AllPosts from "./component/AllPosts";
import OnePost from "./component/OnePost";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={AllPosts}></Route>
        <Route path="/:slug" component={OnePost}></Route>
      </div>
    </BrowserRouter>
  );
}
