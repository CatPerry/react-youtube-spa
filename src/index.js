import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import { API_KEY, REACT_APP_API_KEY } from "../config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null 
    };   
    this.videoSearch('autoimmune natural healing'); 
  }

  videoSearch(term) {
    YTSearch({ key: REACT_APP_API_KEY, term: term }, (videos) => {
      console.log(videos)
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render() {
    // Here we're using lodash to pass a debounced version of this funciton down into the 
    // SearchBar. We're doing this to avoid the lag created in onSearchTermChange as the 
    // page re-renders it search with every character. SO rather than this for SearchBar
    // <SearchBar onSearchTermChange={term => this.videoSearch(term)}/> WE'LL pass in this instead:
    // debounce is basically a setTimeout for the funciton. It wont run until 300ms have lapsed. 
    // It can be called as often as it wants though.
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector(".container")
)
