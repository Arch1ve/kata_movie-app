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

  render() {
    const { name, title, overview, release_date, poster_path } = this.props.data
    const { Text } = Typography
    return (
      <li className="card">
        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} className="card-image" />
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
