// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import "./main.css";
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';

class ExplorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Query: ""
    }
  }

  componentDidMount() {
    this.setState({
      Query: this.props.match.params.q
    });
  }

  render() {

    var query = this.state.Query;
    return (
      <div>
        <SearchInputBox {...this.props}>{query}</SearchInputBox>
        <SearchResults Query={query} />
      </div>
    );
  }
}
class SearchInputBox extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <div>
        <h2 className="p-2">Explore Megaphonic</h2>

        <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

        <div className="container-fluid p-2">
          <div className="row justify-content-center">
            <form>
              <input ref={this.input} defaultValue={this.props.children} type="text" placeholder="Search for something..." className="form-control form-control-lg" />
              <button type="submit" onClick={this.doSearch.bind(this)}>Search</button>
            </form>
          </div>
        </div>

      </div>
    )
  }
  doSearch(event) {
    event.preventDefault();
    this.props.history.push("/explore/" + encodeURI(this.input.current.value));
  }
}
class SearchResults extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var query = this.props.Query;

    if (!query) {
      return (<div>No results</div>);
    }
    return (<div>
      <h5>Search results for '{query}'</h5>
    </div>)
  }
  PerformSearch() {
    var errorResponse = (res) => {
      console.log(res);
    }
    mApi.post("api", "search", {
      q: this.props.Query
    }).done(data => {
      console.log(data);
    }).fail(res => {
      errorResponse(res);
    });
  }
}
export default ExplorePage;