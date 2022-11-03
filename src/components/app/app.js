import React, { Component } from 'react'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import './app.css'
import AppHeader from '../app-header'
import CardList from '../card-list'
import MovieApi from '../../services/movie-db-api'

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
  }

  movieApi = new MovieApi()

  getMovies = (query, page = 1) => {
    this.movieApi
      .getMovies(query, page)
      .then((data) => {
        this.setState({ movies: data.results, loading: false })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }

  render() {
    const { loading, error } = this.state
    return (
      <div className="app">
        <Online>
          <div className="page-wrapper">
            <AppHeader />
            <main className="main">
              <CardList movies={this.state.movies} getMovies={this.getMovies} loading={loading} error={error} />
            </main>
          </div>
        </Online>
        <Offline>
          <Alert
            className="offline-error"
            message="Отсутствует подключение к интернету!"
            description="Проверьте интернет-соединение и попробуйте снова"
            type="error"
            showIcon
          />
        </Offline>
      </div>
    )
  }
}
