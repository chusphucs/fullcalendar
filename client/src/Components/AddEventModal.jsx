import React, { useState } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime'
import validate from 'validate.js'

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
    const [person, setPerson] = useState("")
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());


    const constraints = {
        person: {
            presence: {
                allowEmpty: false,
                message: 'is required'
            }
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const errors = validate({ person }, constraints);
        if (errors) {
            alert("Empty person");
            return;
        }


        onEventAdded({
            person,
            start,
            end
        })
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form action="submit" onSubmit={onSubmit}>
                <input placeholder='Person' value={person} onChange={e => setPerson(e.target.value)} />

                <div>
                    <label > Start</label>
                    <Datetime value={start} onChange={date => setStart(date)} />

                </div>
                <div>
                    <label > End</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />

                </div>
                <button>Add Event</button>
            </form>

        </Modal>
    )
}
