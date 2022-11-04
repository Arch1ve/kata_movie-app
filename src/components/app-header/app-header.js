import React, { Component } from 'react'
import { Input, Tabs } from 'antd'
import { debounce } from 'lodash'

import './app-header.css'

export default class AppHeader extends Component {
  debounceRequest = debounce((query) => {
    const { getMovies } = this.props
    getMovies(query)
  }, 300)

  onChange = (evt) => {
    this.debounceRequest(evt.target.value || 'return')
  }

  render() {
    const items = [
      {
        label: 'Search',
        key: 'search',
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ]

    return (
      <header className="app-header">
        <Tabs className="tabs" defaultActiveKey="search" items={items} />
        <Input placeholder="Type to search..." onChange={(e) => this.onChange(e)} />
      </header>
    )
  }
}
