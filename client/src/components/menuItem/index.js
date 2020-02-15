import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Link = styled.span`
    color: #fff;
`;

export const MenuLink = (props) => {
    return (
        <LinkContainer to={props.to}>
            <Nav.Link>
                <Link>
                    {props.children}
                </Link>
            </Nav.Link>
        </LinkContainer>
    );
}
