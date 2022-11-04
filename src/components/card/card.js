import React, { Component } from 'react'
import { Space, Typography } from 'antd'
import format from 'date-fns/format'

import './card.css'

export default class Card extends Component {
  truncate(str, num) {
    if (str.length <= num) return str
    const substring = str.substr(0, num - 1)
    return substring.substr(0, substring.lastIndexOf(' ')) + '...'
  }

  formatDate(date) {
    if (!date) {
      return 'Release date unknown'
    }
    return format(new Date(date), 'MMMM d, y')
  }

  formatImage(path) {
    const _urlBase = 'https://image.tmdb.org/t/p/original'

    if (!path) {
      return <div className="card-image-absent" />
    }
    return <img src={_urlBase + path} className="card-image" />
  }

  render() {
    const { name, title, overview, release_date, poster_path } = this.props.data
    const { Text } = Typography
    const image = this.formatImage(poster_path)

    return (
      <li className="card">
        {image}
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{name || title}</h3>
            <Space direction="vertical">
              <Text type="secondary">{this.formatDate(release_date)}</Text>
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
