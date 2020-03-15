import React, { useEffect } from 'react'
import { Sidebar, Menu, Icon, Segment, Header, Image, Dropdown, Container, Grid, Pagination, Input, Card, Modal, Form, Checkbox, Button, Tab } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom'

function ContainerComponent(props) {
	const history = useHistory()
	return(
		<Container style={{ marginTop: '20px' }}>
			<Menu pointing attached='top'>
				<Menu.Menu position='left'>
					<Menu.Item name='books' active={true} onClick={() => history.replace('/books')}>
                        Books
					</Menu.Item>
					<Menu.Item name='authors' onClick={() => history.replace('/loans')}>
                        Loans
					</Menu.Item>
				</Menu.Menu>

				{props.menuContent ? <Menu.Menu position='right'>{props.menuContent}</Menu.Menu> : null}
                
			</Menu>
			<Segment attached='bottom'>
				{props.children ? props.children : null}
			</Segment>
		</Container>
	)
}

export default ContainerComponent