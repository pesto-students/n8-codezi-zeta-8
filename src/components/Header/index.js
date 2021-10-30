/* eslint-disable */
import logo from '../../logo.svg'
import user from '../../user1.png'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { useAuth } from 'authentication'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'

function Header() {
   const { authUser, isLoading } = useAuth()
   const { userSignOut } = useAuth()
   const history = useHistory()

   const onLogoutClick = () => {
      userSignOut(() => {
         history.push('/')
      })
   }

   return (
      <Navbar bg="light" className="header" expand="lg">
         <Container>
            <Navbar.Brand className="header-logo">
               <LinkContainer to="/">
                  <Nav.Link>
                     <img width="130" height="30" src={logo} className="logo" />
                  </Nav.Link>
               </LinkContainer>
            </Navbar.Brand>

            {/* <Navbar.Toggle
               aria-controls="basic-navbar-nav "
               className="order-2 order-lg-1"
            /> */}

            {!authUser && !isLoading && (
               <Navbar
                  id="basic-navbar-nav"
                  className="order-3 order-lg-1 header-menu-collapse py-0"
               >
                  <Nav className="header-nav-right">
                     <LinkContainer to="/signin">
                        <Nav.Link className="pa-0">
                           <img
                              src={user}
                              width="40"
                              height="40"
                              className="rounded-circle me-2"
                           />
                           {/* <img
                              src="https://via.placeholder.com/40"
                              className="rounded-circle"
                           /> */}
                           Account
                        </Nav.Link>
                     </LinkContainer>
                     {/* <LinkContainer to="/sign-up">
                        <Nav.Link
                           className="header-nav-right-btn header-nav-right-btn--signUp"
                           variant="primary"
                        >
                           Sign Up
                        </Nav.Link>
                     </LinkContainer> */}
                  </Nav>
               </Navbar>
            )}

            {authUser && !isLoading && (
               <Dropdown className="order-1 order-lg-2 header-user-dropdown">
                  <Dropdown.Toggle className="usertoggle" id="dropdown-basic">
                     {/* <img
                        src="https://via.placeholder.com/40"
                        className="rounded-circle"
                     /> */}
                     <img
                        src={user}
                        className="rounded-circle"
                        width="40"
                        height="40"
                     />
                     &nbsp;&nbsp;
                     <span className="d-none d-lg-inline-block">
                        &nbsp;
                        {`${authUser.firstName || ''} ${
                           authUser.lastName || ''
                        }`}
                        &nbsp;&nbsp;
                     </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                     <Dropdown.Item onClick={onLogoutClick}>
                        Logout
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            )}
         </Container>
      </Navbar>
   )
}

export default Header
