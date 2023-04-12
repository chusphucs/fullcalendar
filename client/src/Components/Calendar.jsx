import React, { useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from "./AddEventModal";
import axios from  "axios"
import moment from "moment";

export default function () {
    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents]= useState([])
    const calendarRef = useRef(null)
    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end:moment(event.end).toDate(),
            title: event.person
        })
    }
    async function handleEventAdd(data){
        await axios.post("/api/calendar/create-event", data.event)
    }
    async function handleDatesSet(data) {
        const start = moment(data.start).toISOString();
        const end = moment(data.end).toISOString();
        const response = await axios.get(`/api/calendar/get-events?start=${start}&end=${end}`);
        setEvents(response.data);
      }
    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Event</button>
            <div style={{position:"relative" ,zIndex:0}}>
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventAdd={(event) => handleEventAdd()}
                datesSet= {(event) => handleDatesSet()}
            />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    )
} 
