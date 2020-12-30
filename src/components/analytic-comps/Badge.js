import React from 'react'
import '../../styles/Badges.css'

const Badge = ({ badge }) => {

    return (
        <div className="badge-container">
            <div className="icon-container" style={{ backgroundColor: badge.color }}>
                <i className={badge.icon}></i>
            </div>
            <p className="badge-value">{badge.data}</p>
            <p className="badge-sentence">{badge.sentence}</p>
        </div>
    )
}

export default Badge