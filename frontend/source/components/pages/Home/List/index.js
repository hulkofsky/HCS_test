import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllTasks} from '../../../../redux/modules/tasks'
import {ls} from '../../../../utils/localStorage'

// components
import ListItem from './Item'

class List extends Component {
  static propTypes = {
    // from reducer tasks
    getAllTasks: PropTypes.func,
    tasks: PropTypes.array,
    error: PropTypes.string
  }

  componentDidMount() {
    const {getAllTasks} = this.props
    const user = ls.get('user')

    if (user) {
      getAllTasks(user._id)
    }
  }

  renderItems = () => {
    const {tasks} = this.props

    return tasks.map(task => {
      return (
        <li key={task._id}>
          <ListItem task={task} />
        </li>
      )
    })

  }

  renderError = () => {
    const {error} = this.props
    return (
      <li style={{color: 'red'}}>
        {error}
      </li>
    )
  }

  render() {
    const {error} = this.props
    return (
      <ul>
        {error ? this.renderError() : this.renderItems()}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  error: state.tasks.error
})
const mapDispatchToProps = {getAllTasks}

export default connect(mapStateToProps, mapDispatchToProps)(List)