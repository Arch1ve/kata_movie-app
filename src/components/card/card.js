import React, { Component } from 'react'
import { Space, Typography } from 'antd'
import format from 'date-fns/format'

import MovieApi from '../../services/movie-db-api'

import './card.css'

export default class Card extends Component {
  state = {
    posterUrl: '',
  }

  movieApi = new MovieApi()

  imgFromBlob = () => {
    this.movieApi.getPoster(this.props.data.poster_path).then((imageBlob) => {
      this.setState({ posterUrl: URL.createObjectURL(imageBlob) })
    })
  }

  truncate(str, num) {
    if (str.length <= num) return str
    const substring = str.substr(0, num - 1)
    return substring.substr(0, substring.lastIndexOf(' ')) + '...'
  }

  componentDidMount() {
    this.imgFromBlob()
  }

  render() {
    const { name, title, overview, release_date } = this.props.data
    const { Text } = Typography
    return (
      <li className="card">
        <img src={this.state.posterUrl} className="card-image" />
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{name || title}</h3>
            <Space direction="vertical">
              <Text type="secondary">{format(new Date(release_date), 'MMMM d, y')}</Text>
              <Text code className="genre">
                Action
              </Text>
              <Text>{this.truncate(overview, 140)}</Text>
            </Space>
          </div>
        </div>
      </li>
    )
  }
}
