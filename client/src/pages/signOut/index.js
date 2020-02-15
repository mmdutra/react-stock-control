import React, { Component } from 'react'
import { isAuthenticated, logout } from '../../services/auth.service'
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {

    render() {
        if (isAuthenticated) {
            logout()
        }

        return (
            <Redirect to='/' />
        );
    }

}