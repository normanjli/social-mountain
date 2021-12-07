import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";
const apiURL = "https://practiceapi.devmountain.com/api/posts";
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.searchPost = this.searchPost.bind(this);
  }

  componentDidMount() {
    (async () => {
      try {
        let res = await axios.get(apiURL);
        this.setState({ posts: res.data });
      } catch (e) {
        console.log(e);
      }
    })();
  }

  async updatePost(id, text) {
    try {
      const body = { text: text };
      let res = await axios.put(`${apiURL}/?id=${id}`, body);
      this.setState({ posts: res.data });
    } catch (e) {
      console.log(e);
    }
  }

  async deletePost(id) {
    try {
      let res = await axios.delete(`${apiURL}/?id=${id}`);
      this.setState({ posts: res.data });
    } catch (e) {
      console.log(e);
    }
  }

  async createPost(text) {
    let body={text:text}
    try{
      let res= await axios.post(apiURL, body)
      this.setState({ posts: res.data });
    }catch(e){
      console.log(e)
    }
  }
  async searchPost(text){
    try{
      let res= await axios.get(apiURL+`/filter?text=`+encodeURI(text))
      this.setState({ posts: res.data });
      console.log(res.data,apiURL+`/filter?text=`+encodeURI(text))
    }catch(e){
      console.log(e)
    }

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map((ele) => (
            <Post
              id={ele.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
              key={ele.id}
              text={ele.text}
              date={ele.date}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
