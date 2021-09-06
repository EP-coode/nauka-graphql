import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../context/auth-context';
import './EventItem.css'


function EventItem({ title, price, creatorId, description, date, eventId, onDetail = ()=>{}}) {
    const authContext = useContext(AuthContext)
    const isOwner = creatorId === authContext.userId

    return (
        <li className="event__list-item">
            <div>
                <h1>{title}</h1>
                <h2>{price} - {new Date(date).toLocaleDateString()}</h2>
            </div>
            <div>
                {
                    isOwner ?
                        <p>You are the owner</p>
                        :
                        <button className="btn" onClick={()=>onDetail(eventId)}>View Details</button>
                }
            </div>
        </li>
    )


}

export default EventItem