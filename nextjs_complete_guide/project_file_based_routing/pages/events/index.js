import {getAllEvents} from "../../data/dummyData";
import EventList from "../../components/events/EventList";

export default function AllEventsPage() {
    const events = getAllEvents()

    return (
        <>
            <EventList items={events}/>
        </>
    )
}