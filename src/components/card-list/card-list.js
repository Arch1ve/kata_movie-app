import React, { Component } from 'react'

import Card from '../card'
import './card-list.css'

export default class CardList extends Component {
  componentDidMount() {
    const { getMovies } = this.props
    getMovies('return')
  }

  render() {
    const { movies } = this.props
    console.log(movies)
    const items = movies.map((el) => {
      return <Card key={el.id} data={el} />
    })

    return <ul className="card-list">{items}</ul>
  }
}
