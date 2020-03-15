import { combineReducers } from 'redux'
import books from './books'
import authors from './authors'
import publishers from './publishers'
import categories from './categories'

export default combineReducers({ books, authors, publishers, categories })