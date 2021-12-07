import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      text: ''
    };
    this.searchPost =this.searchPost.bind(this)
  }
  updateText(text) {
    this.setState({ text });
  }
  searchPost(){
    this.props.searchPostFn(this.state.text)
  }
  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input value={this.state.text} onChange={(e)=>this.updateText(e.target.value)} placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" onClick={this.searchPost} />
        </div>
      </section>
    );
  }
}
