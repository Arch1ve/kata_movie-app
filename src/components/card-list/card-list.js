import React, { Component } from 'react'
import { Alert, Spin } from 'antd'

import Card from '../card'
import './card-list.css'

export default class CardList extends Component {
  componentDidMount() {
    const { getMovies } = this.props
    getMovies('return')
  }

  render() {
    console.log(this.state)

    const { movies, error, loading } = this.props
    console.log(movies)
    const items = movies.map((el) => {
      return <Card key={el.id} data={el} />
    })

    const list = loading || error ? null : <ul className="card-list">{items}</ul>
    const errorAlert = error ? (
      <Alert
        className="offline-error"
        message="Ошибка!"
        description="Во время запроса произошла ошибка."
        type="error"
        showIcon
      />
    ) : null
    const loader = loading ? <Spin className="loader" size="large" /> : null

    return (
      <React.Fragment>
        {loader}
        {list}
        {errorAlert}
      </React.Fragment>
    )
  }
}
