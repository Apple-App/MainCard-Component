import React, { Component } from "react";
import Video from "./video.jsx";
import Poster from "./poster.jsx";
import Score from "./score.jsx";
import Rating from "./rating.jsx";
import axios from "axios";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      movie: {
        // _id: "",
        id: "",
        video: {
          title: "",
          year: "",
          video: ""
        },
        poster: {
          image: ""
        },
        score: {
          all_critics: {
            tomatometer: "",
            average_rating: "",
            reviews_counted: "",
            fresh: "",
            rotten: ""
          },
          consensus: "",
          audience: {
            audience_score: "",
            average_rating: "",
            user_rating: ""
          },
          top_critics: {
            tomatometer: "",
            average_rating: "",
            reviews_counted: "",
            fresh: "",
            rotten: ""
          }
        }
      },
      all: true,
      trailer: false
    };
    this.API_URL = process.env.NODE_ENV === 'production' ? 'http://18.216.97.64' : 'http://localhost:9001';
    this.getMovie = this.getMovie.bind(this);
    this.toggleTopCritics = this.toggleTopCritics.bind(this);
    this.toggleTrailer = this.toggleTrailer.bind(this);
  }

  componentDidMount() {
    this.getMovie();
  }

  toggleTopCritics(e) {
    let bool = e.target.id === "all" ? true : false;
    this.setState({ all: bool });
  }

  toggleTrailer() {
    this.setState({ trailer: !this.state.trailer });
  }

  getMovie(id = 108) {
    id = document.URL.split('?')[1] || id;
    // let url = document.URL.substr(-3);
  //   id = Number(url) ? url : id;
    console.log(this.API_URL+'/movies/'+id)
    axios
      .get(this.API_URL+'/movies/'+id)
      .then(({ data }) => {
        if (data.length === 0) {
        } else {
          this.setState({ movie: data[0] });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Video
          video={this.state.movie.video}
          trailer={this.state.trailer}
          toggleTrailer={this.toggleTrailer}
        />
        <div id="topSection">
          <Poster poster={this.state.movie.poster} />
          <Score
            score={this.state.movie.score}
            toggleTopCritics={this.toggleTopCritics}
            all={this.state.all}
          />
          <Rating />
        </div>
      </div>
    );
  }
}

export default Main;
