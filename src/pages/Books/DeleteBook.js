import React from 'react'
import { Modal, Image, Form, Dropdown, Button, Input, Message, Confirm } from 'semantic-ui-react'
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


function DeleteBook(props){
	const [open, setOpen] = React.useState(false)
	const location = useLocation()

	const handleCancel = () => {
		setOpen(false)
	}

	const handleConfirm = () => {
		Axios.delete(`${process.env.REACT_APP_API_HOST}/books/${props.dataId}`).then(
			result => {
				if (result.status === 200) {
					toast(
						{
							title: 'Success',
							description: 'Book succesfully deleted.',
							time: 2000,
							type: 'success',
						}
					)
					const params = QueryString.parse(location.search, { ignoreQueryPrefix: true })
					props.bookActions.reload('', params)
					setOpen(false)
				}
			},
			error => {
				if (error.response) {
					toast(
						{
							title: 'Error',
							description: 'Server error. Try again later.',
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
	return (
		<React.Fragment>
			<Button basic color='red' onClick={() => setOpen(true)}>Delete</Button>
			<Confirm
				open={open}
				content='Are you sure you want to delete this book?'
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				onClose={handleCancel}
			/>
		</React.Fragment>
	)
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBook)