import React from 'react'
import Badge from './Badge'
import { useSelector } from 'react-redux'
import { selectBadges } from '../../state/slices/clientsSlice'

const Badges = () => {
    const badgeData = useSelector(selectBadges)

    return (
        <div id="badges-container">
            {Object.keys(badgeData).map((badgeName, i) => <Badge key={i} badge={badgeData[badgeName]} />)}
        </div>
    )
}

export default Badges