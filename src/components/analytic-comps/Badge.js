import React, { Component } from 'react'

class Badge extends Component {

    render() {
        return(
            <div>
                <div><i className={this.props.badgeCategory.icon}></i></div>
                <div>{this.props.badgeCategory.data}</div>
                <div>{this.props.badgeCategory.sentence}</div>
            </div>
        )
    }
}

export default Badge