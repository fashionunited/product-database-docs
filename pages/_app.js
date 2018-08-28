import React from 'react'
import App, { Container } from 'next/app'
import {
  Layout,
  SideNav,
  Pagination
} from 'mdx-docs'

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Developers Home', path: '/developers/' },
  { name: 'Developer Docs', path: '/developers/docs/' },
  { name: 'Product Database', path: '/developers/product-database/' },
  { name: 'Getting Started', path: '/developers/getting-started' },
  { name: 'Components', path: '/developers/components' },
  { name: 'Button', path: '/developers/components/Button' },
]

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let page = {}

    if (Component.getInitialProps) {
      page = await Component.getInitialProps(ctx)
    }

    return { page }
  }

  render() {
    const { Component, page } = this.props

    return (
      <Container>
        <Layout
          {...this.props}
          routes={routes}
          sidebar={(
            <SideNav />
          )}
          footer={(
            <Pagination />
          )}>
          <Component {...page} />
        </Layout>
      </Container>
    )
  }
}
