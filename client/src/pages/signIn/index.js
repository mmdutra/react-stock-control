import React, { useState } from 'react'
import { Col, Button, Row, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { login, TOKEN_KEY } from '../../services/auth.service'
import './index.css';
import styled from 'styled-components';
import Content from '../../components/content';

const StyledForm = styled(Form)`
    max-width: 400px;
    margin: auto;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 13px;
    margin-top: 50pt;
`;

const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn(e) {
        e.preventDefault();

        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                login({ email, password })
                    .then(res => {
                        localStorage.setItem(TOKEN_KEY, res.data.token);
                        props.history.push('/home')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const formGroup = {
        'padding': '20px 20px 0px 20px'
    }

    const button = {
        'minWidth': '100%',
    }


    return (
        <Content>
            <Row >
                <Col >
                    <StyledForm className="login-view" onSubmit={handleSignIn}>
                        <div>
                            <Form.Group style={formGroup}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter username"
                                />
                            </Form.Group>
                            <Form.Group style={formGroup}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <div className="button-div">
                                <Button style={button} type='submit' variant='dark'>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </StyledForm>
                </Col>
            </Row>
        </Content>
    )
}

export default withRouter(SignIn)