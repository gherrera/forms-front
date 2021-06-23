import './Service.scss'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Content, Sidebar, Wrapper } from './layout'
import { Page, PageBottomBar, PageContent, PageFooter, PageHeader, PageTopBar } from '../../layouts/Private/components'
import { TabForms } from './components'
import { Button } from "antd";


class Service extends Component {
  state = {
    breadcrumbs: this.getBreadcrumbs(),
    title: 'Diseño',
    keyTab: Math.random()
	}

  componentDidMount() {

  }

  getBreadcrumbs() {

    const breadcrumbs = [
      { title: 'Diseño', icon: 'form', link: '/design', onClick: this.clickMenuDesign.bind(this) }
    ]

    return breadcrumbs
  }

  clickMenuDesign() {
    this.setState({ keyTab: Math.random(), breadcrumbs: this.getBreadcrumbs(), title: 'Diseño' })
  }

  refreshBreadCrumbs({ title, onClick, link, breadcrumbs, nav} ) {
    if(breadcrumbs) {
      this.setState({ breadcrumbs, title })
    }else {
      let b = this.state.breadcrumbs
      b.push({ title, icon: 'form', onClick, link })
      this.setState({ breadcrumbs: b, title: nav ? nav : title })
    }
  }

  render() {
		const { breadcrumbs, title, keyTab } = this.state
		const { currentUser, t } = this.props

		return (
      <div className="service1">
        <Page>
          <PageHeader
            title={title}
            breadcrumbs={breadcrumbs}
            />
          <PageContent>
            <Wrapper>
              <TabForms key={keyTab} currentUser={currentUser} breadcrumbs={breadcrumbs} refreshBreadCrumbs={this.refreshBreadCrumbs.bind(this)} />
            </Wrapper>
          </PageContent>
        </Page>
      </div>
    )
  }
}
export default withRouter(Service)
