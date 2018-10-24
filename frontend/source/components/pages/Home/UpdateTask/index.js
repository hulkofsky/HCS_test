import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateOneTask, requestFailed} from '../../../../redux/modules/tasks'
import {ls} from '../../../../utils/localStorage'
import {Api} from '../../../../utils/api'
import {formatTimeForRobot} from '../../../../utils/helpers'

// style
import ClassNames from './form.css'

// components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ClassName from '../../../pages/Login/login.css'
import BaseForm from '../../../elements/BaseForm/index'


class UpdateTask extends BaseForm {
  static propTypes = {
    // from Item
    open: PropTypes.bool,
    hideDialog: PropTypes.func,
    taskId: PropTypes.string,
    // from reducer tasks
    pending: PropTypes.bool
  }

  state = {
    formFieldsConfig: {
      taskName: {
        name: 'taskName',
        value: '',
        label: 'Enter task name',
        id: 'task-name-id',
        touched: false
      },
      description: {
        name: 'description',
        value: '',
        label: 'Enter task description',
        id: 'description-id',
        touched: false
      },
      dueDate: {
        name: 'dueDate',
        value: '',
        label: 'Choose due date',
        id: 'due-date-id',
        touched: false
      }
    }
  }

  componentDidMount() {
    const {taskId, requestFailed} = this.props
    const user = ls.get('user')

    Api.getOneTask(user._id ,taskId)
      .then(response => {
        const task = response.data.task
        this.setState({
          formFieldsConfig: {
            taskName: {
              ...this.state.formFieldsConfig.taskName,
              value: task.taskName
            },
            description: {
              ...this.state.formFieldsConfig.description,
              value: task.description
            },
            dueDate: {
              ...this.state.formFieldsConfig.dueDate,
              value: formatTimeForRobot(task.dueDate)
            }
          }
        })
      })
      .catch(error => {
        requestFailed(error.message)
        window.console.log(error.message)
      })
  }

  onSubmit = () => {
    const {hideDialog, taskId, updateOneTask} = this.props
    const user = ls.get('user')

    this.collectDataToSubmit(this.state)
      .then(task => {
        updateOneTask(user._id, taskId, task)
      })
      .then(() => hideDialog())
  }

  onButtonAddClick = () => {
    const {hideDialog} = this.props
    this.onSubmit()
    hideDialog()
  }

  render() {
    const {open, hideDialog, pending} = this.props
    const {taskName, description, dueDate} = this.state.formFieldsConfig
    return (
      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update task
        </DialogTitle>
        <DialogContent>
          <form
            noValidate
            className={ClassNames.form}
            onSubmit={this.onSubmit}
          >
            <div>
              <TextField
                {...taskName}
                className={ClassName.input}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
                defaultValue={taskName.value}
              />
            </div>
            <div>
              <TextField
                {...description}
                className={ClassName.input}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
                defaultValue={description.value}
              />
            </div>
            <div>
              <TextField
                {...dueDate}
                className={ClassName.input}
                type='date'
                defaultValue={dueDate.value}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.onButtonAddClick}
            color="primary"
            autoFocus
            disabled={pending || this.disableSubmit()}
          >
            Update task
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  pending: state.tasks.pending
})
const mapDispatchToProps = {updateOneTask, requestFailed}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTask)