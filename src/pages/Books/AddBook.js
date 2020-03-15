import React from 'react'
import { Modal, Image, Form, Dropdown, Button, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as books from '../../public/redux/actions/books'
import * as authors from '../../public/redux/actions/authors'
import * as publishers from '../../public/redux/actions/publishers'
import * as categories from '../../public/redux/actions/categories'
import Axios from 'axios'
import { toast } from 'react-semantic-toasts'
import { useLocation, useHistory } from 'react-router-dom'
import QueryString from 'qs'


function AddBook(props){
	const [bookData, setBookData] = React.useState({})
	const location = useLocation()

	const loadYearOptions = () => {
		let res = []
		let currentYear = new Date().getFullYear()
		for(let i = currentYear - 100; i <= currentYear; i++){
			res.push({
				key: i,
				text: i,
				value: i
			})
		}
		res = res.reverse()
		return res
	}
	const loadAuthorOptions = () => {
		let res = props.authors.items.map(author => ({
			key: author.id,
			text: author.name,
			value: author.id
		}))
		return res
	}
    
	const handleAddAuthor = name => {
		const data = {name}
		Axios.post(`${process.env.REACT_APP_API_HOST}/authors`, data)
	}
    
	const loadPublisherOptions = () => {
		let res = props.publishers.items.map(publisher => ({
			key: publisher.id,
			text: publisher.name,
			value: publisher.id
		}))
		return res
	}

	const handleAddPublisher = name => {
		const data = { name }
		Axios.post(`${process.env.REACT_APP_API_HOST}/publishers`, data)
	}

	const loadCategoryOptions = () => {
		let res = props.categories.items.map(category => ({
			key: category.id,
			text: category.name,
			value: category.id
		}))
		return res
	}

	const handleAddCategory = name => {
		const data = { name }
		Axios.post(`${process.env.REACT_APP_API_HOST}/categories`, data)
	}
    
	const handleChange = (field, value) => {
		setBookData({ ...bookData, [field]: value })
	}
	const handleAddBook = () => {
		const data = bookData
		Axios.post(`${process.env.REACT_APP_API_HOST}/books`, data).then(
			result => {
				if(result.status === 200){
					toast(
						{
							title: 'Success',
							description: 'New book succesfully inserted.',
							time: 2000,
							type: 'success',
						}
					)
					const params = QueryString.parse(location.search, { ignoreQueryPrefix: true })
					props.bookActions.reload('', params)
				}
			},
			error => {
				if (error.response && error.response.data && error.response.data.errors){
					const errStrings = error.response.data.errors.map(e => e.message)
					toast(
						{
							title: 'Error',
							description: 'Check fields then try again.',
							list: errStrings,
							time: 2000,
							type: 'error',
						}
					)
				} else {
					toast(
						{
							title: 'Error',
							description: 'Check your connection then try again.',
							time: 2000,
							type: 'error',
						}
					)
				}
				
			}
		)
	}
    
	return props.trigger ? (
		<Modal trigger={props.trigger}>
			<Modal.Header>Add a Book</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Form>
						<Form.Field>
							<label>Title</label>
							<input placeholder='Title' value={bookData.title} onChange={e => handleChange('title', e.target.value)} />
						</Form.Field>
						<Form.Field>
							<label>Year</label>
							<Dropdown
								placeholder='Published year'
								fluid
								selection
								search
								value={bookData.year}
								options={loadYearOptions()}
								onChange={(e, data) => handleChange('year', data.value)}
							/>
						</Form.Field>
						<Form.Field>
							<label>Author</label>
							<Dropdown
								placeholder='Select Author'
								fluid
								selection
								search
								allowAdditions
								value={bookData.authorId}
								options={loadAuthorOptions()}
								onAddItem={(e, data) => handleAddAuthor(data.value)}
								onOpen={() => props.authorActions.reload('', {})}
								onSearchChange={(e,data) => {
									const params = {
										search: data.value
									}
									props.authorActions.reload('',params)
								}}
								onChange={(e, data) => handleChange('authorId', data.value)}
							/>
						</Form.Field>
						<Form.Field>
							<label>Publisher</label>
							<Dropdown
								placeholder='Select Publisher'
								fluid
								selection
								search
								allowAdditions
								value={bookData.publisherId}
								options={loadPublisherOptions()}
								onAddItem={(e, data) => handleAddPublisher(data.value)}
								onOpen={() => props.publisherActions.reload('', {})}
								onSearchChange={(e, data) => {
									const params = {
										search: data.value
									}
									props.publisherActions.reload('', params)
								}}
								onChange={(e, data) => handleChange('publisherId', data.value)}
							/>
						</Form.Field>
						<Form.Field>
							<label>Category</label>
							<Dropdown
								placeholder='Select Category'
								fluid
								selection
								search
								allowAdditions
								value={bookData.categoryId}
								options={loadCategoryOptions()}
								onAddItem={(e, data) => handleAddCategory(data.value)}
								onOpen={() => props.categoryActions.reload('', {})}
								onSearchChange={(e, data) => {
									const params = {
										search: data.value
									}
									props.categoryActions.reload('', params)
								}}
								onChange={(e, data) => handleChange('categoryId', data.value)}
							/>
						</Form.Field>
						<Button type='submit' onClick={() => handleAddBook()}>Submit</Button>
					</Form>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	) : null
}

const mapStateToProps = state => ({
	books: state.books,
	authors: state.authors,
	publishers: state.publishers,
	categories: state.categories
})

const mapDispatchToProps = dispatch => ({
	bookActions: bindActionCreators(books, dispatch),
	authorActions: bindActionCreators(authors, dispatch),
	publisherActions: bindActionCreators(publishers, dispatch),
	categoryActions: bindActionCreators(categories, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)