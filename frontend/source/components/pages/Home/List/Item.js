import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {formatTimeForRobot, formatTime} from '../../../../utils/helpers'
import {connect} from 'react-redux'
import {deleteOneTask} from '../../../../redux/modules/tasks'

// style
import ClassNames from './list-item.css'

// components
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import Loader from '../../../elements/Loader/index'
import UpdateTask from '../UpdateTask/index'
import {ls} from '../../../../utils/localStorage'

class ListItem extends Component {

  static propTypes = {
    // from List (index.js)
    task: PropTypes.object,
    // from reducer tasks
    deleteOneTask: PropTypes.func
  }

  state = {
    isDialogOpen: false
  }

  showDialog = () => this.setState({ isDialogOpen: true })
  hideDialog = () => this.setState({ isDialogOpen: false })

  onButtonDeleteClick = () => {
    const user = ls.get('user')
    const {task, deleteOneTask} = this.props
    deleteOneTask(user._id, task._id)
  }

  render() {
    const {task} = this.props
    const {isDialogOpen} = this.state

    if (!task) return <Loader />

    return <div className={ClassNames.task}>
      {
        isDialogOpen && <UpdateTask
        taskId={task._id}
        open={isDialogOpen}
        hideDialog={this.hideDialog}
      />
      }
      <div className={ClassNames.grow}>
        <h3>{task.taskName}</h3>
        <time dateTime={formatTimeForRobot(task.dueDate)}>
          {formatTime(task.dueDate)}
        </time>
        <p>
          {task.description}
        </p>
      </div>
      <div className={ClassNames['buttons-wrapper']}>
        <Button
          variant='fab'
          color='secondary'
          aria-label='Edit'
          style={{marginRight: 15}}
          onClick={this.showDialog}
        >
          <Icon>edit_icon</Icon>
        </Button>
        <Button
          variant='fab'
          aria-label='Delete'
          onClick={this.onButtonDeleteClick}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  }

}

export default connect(null, {deleteOneTask})(ListItem)