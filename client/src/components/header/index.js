import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { MenuLink } from '../menuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated, logout } from '../../services/auth.service'

import styled from 'styled-components'

const Title = styled.h1`
    font-size: 1.5em!important;
    text-align: left;
    color: #fff;
`;

const StyledNav = styled(Nav)`
    width: 100%;
    justify-content: flex-end;
`;


export const Header = () => {

    function signOut() {
        if (!isAuthenticated()) {
            logout()
            return <Redirect to='/' />
        }
    }

    return (
        <header>
            <Navbar bg="dark" expand="md">
                <Navbar.Brand >
                    <Link to='/home'>
                        <Title>
                            Stock Control
                        </Title>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" >
                    <StyledNav className="mr-auto" >
                        <MenuLink to='/home'>
                            Home
                        </MenuLink>
                        <MenuLink to='/products'>
                            Products
                        </MenuLink>
                        <MenuLink className="logout" onClick={signOut()} to='/logout'>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </MenuLink>
                    </StyledNav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}