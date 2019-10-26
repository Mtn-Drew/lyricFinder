import React, { Component } from 'react'
import axios from 'axios'
import  { Consumer } from '../../context'

 class Search extends Component {

  state = {
    trackTitle: ''
  }

  // this would require you to bind 'this' ie... onChange={this.onChange.bind(this)}
  // onChange(e) {
  //   this.setState({trackTitle: e.target.value})
  // }
  // use arrow function to avoid having to bind 'this'
  // onChange = (e) => {
  //   this.setState({ trackTitle: e.target.value})
  // }
    onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  findTrack = (dispatch, e) => {
    e.preventDefault()
    console.log('tractTitle is ')
    console.log(this.state.trackTitle)
    axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)

      .then(res => {
      console.log('res data is '+ res.data)
      console.log(res.data)
      dispatch({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list
      })
      this.setState({trackTitle: ''})
    })
      .catch(err => console.log(err))
    }
  

  render() {
    return (
      <Consumer>
        {value => {
          console.log('value is '+ value)
          console.log(value)
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">

              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i>Search For A Song
              </h1>

              <p className="lead text-center">Get the lyrics for any song</p>

              <form onSubmit={this.findTrack.bind(this, dispatch)}>

                <input 
                type="text" 
                className="form-control form-control-lg" 
                placeholder="Song title..." 
                name="trackTitle" 
                value={this.state.trackTitle} 
                onChange={this.onChange}
                 />

                 <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics
                 </button>
              </form>

            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search