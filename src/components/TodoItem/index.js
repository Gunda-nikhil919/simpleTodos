import {useState} from 'react'

import './index.css'

const TodoItem = props => {
  const {deleteTodo, todoList, onEditedTask, onToggleTodo} = props
  const {id, title, isCompleted} = todoList

  const [isEdit, setIsEdit] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onClickEdit = () => {
    setIsEdit(true)
  }

  const onSaveEditTask = () => {
    if (taskTitle.trim() === '') {
      return
    }

    setIsEdit(false)
    onEditedTask(id, taskTitle)
  }

  const onChangeTitle = event => {
    setTaskTitle(event.target.value)
  }

  const onClickCheckInput = () => {
    onToggleTodo(id)
  }

  return (
    <li className="card">
      {isEdit ? (
        <div className="text-btn-div">
          <input
            className="edit-input"
            type="text"
            value={taskTitle}
            onChange={onChangeTitle}
          />

          <button
            type="button"
            className="save-edit-btn"
            onClick={onSaveEditTask}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="text-btn-div">
          <div className="input-label-div">
            <input
              className="check-box"
              type="checkbox"
              checked={isCompleted}
              onChange={onClickCheckInput}
            />

            <p className={isCompleted ? 'title checked-title' : 'title'}>
              {title}
            </p>
          </div>

          <button type="button" className="save-edit-btn" onClick={onClickEdit}>
            Edit
          </button>
        </div>
      )}

      <button type="button" onClick={onDeleteTodo} className="delete-btn">
        Delete
      </button>
    </li>
  )
}

export default TodoItem