import React, { Component } from 'react'
import '../styles/Badges.css'

class Badge extends Component {

    render() {
        return(
            <div className="badge-container">
                <div className="icon-container" style={{backgroundColor: this.props.badgeCategory.color}}><i className={this.props.badgeCategory.icon}></i></div>
                <div className="badge-value">{this.props.badgeCategory.data}</div>
                <div className="badge-sentence">{this.props.badgeCategory.sentence}</div>
            </div>
        )
    }
}

export default Badge