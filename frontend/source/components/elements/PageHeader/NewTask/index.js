import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addNewTask} from '../../../../redux/modules/tasks'
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
import BaseForm from '../../BaseForm/index'
import {ls} from '../../../../utils/localStorage'

class NewTask extends BaseForm {
  static propTypes = {
    // from PageHeader
    open: PropTypes.bool,
    hideDialog: PropTypes.func,
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
        id: 'due-date-id',
        touched: false
      }
    }
  }

  onSubmit = () => {
    const {hideDialog, addNewTask} = this.props
    const user = ls.get('user')

    this.collectDataToSubmit(this.state)
      .then(task => {
        addNewTask(user._id, task)
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
          Add new task
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
              />
            </div>
            <div className={ClassNames.field}>
              <TextField
                {...description}
                className={ClassName.input}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
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
            Add task
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  pending: state.tasks.pending
})
const mapDispatchToProps = {addNewTask}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask)