import { formatDate, showDateHelper } from '../../utils/util'

/**
 * 定义一个Todo对象，
 * 通过 new Todo() 来创建
 */
export class Todo {
  constructor(title, content, level, planDate) {
    this.title = title;
    this.level = level;
    this.content = content;
    this.state = 0;
    this.date = formatDate(new Date());
    this.planDate = planDate;
    this.levelClass = "level" + level;
  }
}

export function markDoing(todo) {
  todo.state = 1
}

export function markDone(todo) {
  todo.state = 2
}

class Level {
  constructor(title, level) {
    this.levelTitle = title;
    this.level = level;
  }
}

let levelArray = [
  new Level("重要且紧急", 1),
  new Level("重要不紧急", 2),
  new Level("紧急不重要", 3),
  new Level("不紧急不重要", 4)
]

export function getLevelArray() {
  return levelArray;
}

export function getLevelTitle(level) {
  return levelArray.filter(item => item.level == level)[0].levelTitle
}

// global dataSource
let todos = []
let dones = []
/**
 * 获取 todos 数据
 */
export function getTodos() {
  return wx.getStorageSync("todos") || []
}

export function saveTodos(todos) {
  wx.setStorageSync("todos", todos)
}

export function getDones() {
  return wx.getStorageSync("dones") || []
}

export function saveDones(todos) {
  wx.setStorageSync("dones", todos)
}


/**
 * 获取 用于显示的 todos 数据
 */
export function getShowTodos() {
  let todos = getTodos()
  return showDateHelper(todos)
}
export function getShowDones() {
  let dones = getDones()
  return showDateHelper(dones)
}

/**
 * 添加一个Todo对象，并返回
 * @param {*} todo 
 */
export function addTodo(todo) {
  let todos = getTodos()
  todos.unshift(todo)
  saveTodos(todos)
}

export function addDones(todo) {
  let todos = getDones()
  todos.unshift(todo)
  saveDones(todos)
}

export function deleteTodo(title, index) {
  let todos = getTodos()
  let deleteTodo = todos[index]
  if (deleteTodo.title === title) {
    todos.splice(index, 1)
  }
  saveTodos(todos)
}