import React, {Fragment} from 'react'
import {history} from '../../../history'
import {Path} from '../../routes'

// style
import ClassName from './page-not-found.css'

// components
import Button from '@material-ui/core/Button'
import PageHeader from '../../elements/PageHeader/index'

function NotFound() {
  const onButtonHomeClick = event => {
    event && event.preventDefault && event.preventDefault()
    history.replace(Path.home)
  }

  return (
    <Fragment>
      <PageHeader />
      <section className={ClassName.wrapper}>
        <h1 className={ClassName.title}>
          <span className={ClassName.status}>404</span>
          Page not found!
        </h1>
        <Button
          color="primary"
          onClick={onButtonHomeClick}
        >
          Back to Home page
        </Button>
      </section>
    </Fragment>
  )
}

export default NotFound