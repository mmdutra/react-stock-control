import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Content from '../../components/content';

const animation = keyframes`
    0% {position: relative; left: -100%;}
    100% {position: relative; left: 0px;}
`;

const Title = styled.h1`
    animation: ${animation} 3s;
`;

export default function Home() {
    return (
        <Content>
            <Row>
                <Col>
                    <Title>
                        Olá, mundo!
                    </Title>
                </Col>
            </Row>
        </Content>
    );
}