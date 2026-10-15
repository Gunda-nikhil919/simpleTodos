import './index.css'
import {Component} from 'react'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isCompleted: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    inputData: '',
  }

  deleteTodo = todoId => {
    const {todoList} = this.state

    const filteredTodos = todoList.filter(eachTodo => eachTodo.id !== todoId)

    this.setState({
      todoList: filteredTodos,
    })
  }

  onChangeInput = event => {
    this.setState({
      inputData: event.target.value,
    })
  }

  onAddNewTask = () => {
    const {inputData} = this.state
    const input = inputData.trim()

    if (input === '') {
      return
    }

    const parts = input.split(' ')
    const lastPart = parts[parts.length - 1]
    const count = Number(lastPart)

    let title = input
    let numberOfTodos = 1

    if (!Number.isNaN(count) && count > 0 && Number.isInteger(count)) {
      title = parts.slice(0, -1).join(' ').trim()
      numberOfTodos = count

      if (title === '') {
        return
      }
    }

    const newTodos = Array.from({length: numberOfTodos}, () => ({
      id: Date.now() + Math.random(),
      title,
      isCompleted: false,
    }))

    this.setState(prevState => ({
      todoList: [...prevState.todoList, ...newTodos],
      inputData: '',
    }))
  }

  onSaveExistingTask = (id, taskTitle) => {
    const {todoList} = this.state

    const updatedTodoList = todoList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          ...eachTodo,
          title: taskTitle,
        }
      }

      return eachTodo
    })

    this.setState({
      todoList: updatedTodoList,
    })
  }

  onToggleTodo = todoId => {
    const {todoList} = this.state

    const updatedTodoList = todoList.map(eachTodo => {
      if (eachTodo.id === todoId) {
        return {
          ...eachTodo,
          isCompleted: !eachTodo.isCompleted,
        }
      }

      return eachTodo
    })

    this.setState({
      todoList: updatedTodoList,
    })
  }

  render() {
    const {todoList, inputData} = this.state

    return (
      <div className="bg-container">
        <div className="todo-card">
          <h1 className="heading">Simple Todos</h1>

          <div className="input-div-container">
            <input
              type="text"
              className="input"
              placeholder="Add Task"
              value={inputData}
              onChange={this.onChangeInput}
            />

            <button
              type="button"
              onClick={this.onAddNewTask}
              className="add-task-btn"
            >
              Add
            </button>
          </div>

          <ul className="todo">
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoList={eachTodo}
                onEditedTask={this.onSaveExistingTask}
                deleteTodo={this.deleteTodo}
                onToggleTodo={this.onToggleTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
