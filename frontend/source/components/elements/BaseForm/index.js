import React, {Component} from 'react'

class Index extends Component {
  collectDataToSubmit = state => {
    return new Promise((ok, stop) => {
      const {formFieldsConfig} = state
      const data = {}

      for (const key in formFieldsConfig) {

        if (formFieldsConfig.hasOwnProperty(key)) {
          data[key] = formFieldsConfig[key].value.trim()
        }

        ok(data)
      }

    })
  }

  onChangeValueInput = event => {
    const {name, value} = event.target

    this.setState(prevState => {
      return {
        formFieldsConfig: {
          ...prevState.formFieldsConfig,
          [name]: {
            ...prevState.formFieldsConfig[name],
            value: value
          }
        }
      }
    })
  }

  onBlurInput = event => {
    const {name} = event.target

    this.setState(prevState => {
      return {
        formFieldsConfig: {
          ...prevState.formFieldsConfig,
          [name]: {
            ...prevState.formFieldsConfig[name],
            touched: true
          }
        }
      }
    })
  }

  disableSubmit = () => {
    const {formFieldsConfig} = this.state
    const values = []

    for (const key in formFieldsConfig) {
      if (formFieldsConfig.hasOwnProperty(key)) {
        values.push(!!formFieldsConfig[key].value)
      }
    }

    return values.includes(false)
  }
}

export default Index
