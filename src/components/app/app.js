import React, { Component } from 'react'
import { Online, Offline } from 'react-detect-offline'
import { Alert, Pagination } from 'antd'

import './app.css'
import AppHeader from '../app-header'
import CardList from '../card-list'
import MovieApi from '../../services/movie-db-api'

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    query: '',
    total: 0,
    currentPage: 1,
  }

  movieApi = new MovieApi()

  getMovies = (query, page = 1) => {
    this.setState({ loading: true, currentPage: page })
    this.movieApi
      .getMovies(query, page)
      .then((data) => {
        this.setState({ movies: data.results, loading: false, query, total: data.total_pages })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }

  paginationChange = (evt) => {
    this.getMovies(this.state.query, evt)
  }

  render() {
    const { loading, error, movies, currentPage } = this.state
    return (
      <div className="app">
        <Online>
          <div className="page-wrapper">
            <AppHeader getMovies={this.getMovies} />
            <main className="main">
              <CardList movies={this.state.movies} getMovies={this.getMovies} loading={loading} error={error} />
              {movies.length > 0 && !loading ? (
                <Pagination
                  className="pagination"
                  defaultCurrent={1}
                  current={currentPage}
                  defaultPageSize={20}
                  total={50 * 20}
                  showSizeChanger={false}
                  onChange={(e) => this.paginationChange(e)}
                />
              ) : null}
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
