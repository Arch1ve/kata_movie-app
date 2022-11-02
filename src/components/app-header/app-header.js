import React, { Component } from 'react'
import { Input, Tabs } from 'antd'

import './app-header.css'

export default class AppHeader extends Component {
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
        <Input placeholder="Type to search..." />
      </header>
    )
  }
}
