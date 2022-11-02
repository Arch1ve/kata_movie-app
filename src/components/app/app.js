import React, { Component } from 'react'

import './app.css'
import AppHeader from '../app-header'
import CardList from '../card-list'
import MovieApi from '../../services/movie-db-api'

export default class App extends Component {
  state = {
    movies: [],
  }

  movieApi = new MovieApi()

  getMovies = (query, page = 1) => {
    this.movieApi.getMovies(query, page).then((data) => {
      this.setState({ movies: data.results })
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main className="main">
          <CardList movies={this.state.movies} getMovies={this.getMovies} />
        </main>
      </div>
    )
  }
}
