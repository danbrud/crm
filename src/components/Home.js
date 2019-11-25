import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Home extends Component {

    render() {

        this.props.redirectPage()

        return(
            <Redirect to="/clients" />
        )
    }
}

export default Home