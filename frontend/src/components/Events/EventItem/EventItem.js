import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../context/auth-context';
import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import './EventItem.css'


function EventItem({ title, price, creatorId, description }) {
    const authContext = useContext(AuthContext)
    const [details, setDetails] = useState(false)
    const isOwner = creatorId === authContext.userId

    return (
        <li className="event__list-item">
            <div>
                <h1>{title}</h1>
                <h2>{price}</h2>
            </div>
            <div>
                {
                    isOwner ?
                        <p>You are the owner</p>
                        :
                        <button className="btn" onClick={() => setDetails(true)}>View Details</button>
                }
            </div>
            {
                details &&
                <React.Fragment>
                    <Backdrop />
                    <Modal
                        title={title}
                        onCancel={() => setDetails(false)}
                    >
                        <p>{description}</p>
                    </Modal>
                </React.Fragment>
            }
        </li>
    )


}

export default EventItem