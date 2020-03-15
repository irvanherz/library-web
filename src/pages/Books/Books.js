import React, { useEffect } from 'react'
import { Icon, Segment, Image, Dropdown, Grid, Pagination, Card, Button } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom'
import QueryString from 'qs'
import Container from '../Container'
import AddBook from './AddBook'
import DeleteBook from './DeleteBook'
import EditBook from './EditBook'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as books from '../../public/redux/actions/books'
import * as authors from '../../public/redux/actions/authors'

const SORTS = [
	{
		title: 'Newest',
		sortBy: 'year',
		sortOrder: 'desc'
	},
	{
		title: 'Oldest',
		sortBy: 'year',
		sortOrder: 'asc'
	},
	{
		title: 'New Collection',
		sortBy: 'createdAt',
		sortOrder: 'desc'
	},
]


function Books(props) {
	const location = useLocation()
	const history = useHistory()
    
	useEffect(() => {
		const token = ''
		props.bookActions.reload(token, {})
	}, [])

	useEffect(() => {
		const token = ''
		const params = QueryString.parse(location.search, { ignoreQueryPrefix: true })
		props.bookActions.reload(token, params)
	}, [location.search])
    
	const handleSearch = (query) => {
		const params = QueryString.parse(history.location.search, { ignoreQueryPrefix: true })
		if (query) {
			params.search = query
		} else {
			delete params.search
		}
		history.replace(history.location.pathname + QueryString.stringify(params, { addQueryPrefix: true }))
	}

	const handlePageChange = (page) => {
		const params = QueryString.parse(history.location.search, { ignoreQueryPrefix: true })
		if (page > 1) {
			params.page = page
		} else {
			delete params.page
		}
		history.replace(history.location.pathname + QueryString.stringify(params, { addQueryPrefix: true }))
	}

	const handleSort = (sort) => {
		const params = QueryString.parse(history.location.search, { ignoreQueryPrefix: true })
		params.sortBy = sort.sortBy
		params.sortOrder = sort.sortOrder
		history.replace(history.location.pathname + QueryString.stringify(params, { addQueryPrefix: true }))
	}

	return (
		<Container menuContent={
			<React.Fragment>
				<Dropdown item text='Sort'>
					<Dropdown.Menu>
						{
							SORTS.map(sort => (<Dropdown.Item onClick={() => handleSort(sort)}>{sort.title}</Dropdown.Item>))
						}
					</Dropdown.Menu>
				</Dropdown>
				<div className='ui right aligned category search item'>
					<div className='ui transparent icon input'>
						<input
							className='prompt'
							type='text'
							placeholder='Search books...'
							onChange={e => handleSearch(e.target.value)}
						/>
						<i className='search link icon' />
					</div>
					<div className='results' />
				</div>
			</React.Fragment>
		}>
			{/* Content */}
			<Grid>
				{
					props.books.items.map(book => (
						<Grid.Column mobile={16} tablet={8} computer={4} key={book.id}>
							<Card fluid>
								<Image src={book.image ? book.image : `${process.env.PUBLIC_URL}/book.jpg`} wrapped ui={false} />
								<Card.Content>
									<Card.Header>{book.title ? book.title : <i>Untitled</i>}</Card.Header>
									<Card.Meta><Icon name='time' />{book.year ? <span>{book.year}</span> : <i>Unknown year</i>}</Card.Meta>
									<Card.Meta><Icon name='user' />{book.authorName ? <span>{book.authorName}</span> : <i>Unknown author</i>}</Card.Meta>
									
									<Card.Description>
										{book.summary ? book.summary : <i>No summary</i>}
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div className='ui two buttons'>
										<EditBook data={book} trigger={<Button basic color='green'>Edit</Button>}/>
										<DeleteBook dataId={book.id} />
									</div>
								</Card.Content>
							</Card>
						</Grid.Column>
					))
				}
			</Grid>
			{/* Pagination */}
			{
				props.books && props.books.totalPages ? 
					(
						<Segment textAlign='center'>
							<Pagination
								defaultActivePage={1}
								ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
								firstItem={{ content: <Icon name='angle double left' />, icon: true }}
								lastItem={{ content: <Icon name='angle double right' />, icon: true }}
								prevItem={{ content: <Icon name='angle left' />, icon: true }}
								nextItem={{ content: <Icon name='angle right' />, icon: true }}
								totalPages={props.books.totalPages}
								onPageChange={(e, data) => {handlePageChange(data.activePage)}}
							/>
						</Segment>
					) : 
					null
			}
			<AddBook trigger={
				<Button circular style={{ position: 'fixed', bottom: '30px', right: '30px' }} size='big' color='facebook' icon='plus' />
			}/>
            
		</Container>
	)
}
const mapStateToProps = state => ({
	books: state.books,
	authors: state.authors
})

const mapDispatchToProps = dispatch => ({
	bookActions: bindActionCreators(books, dispatch),
	authorActions: bindActionCreators(authors, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
