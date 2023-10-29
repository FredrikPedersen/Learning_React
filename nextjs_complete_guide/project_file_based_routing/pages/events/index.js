import {getAllEvents} from "../../data/dummyData";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export default function AllEventsPage() {
    const events = getAllEvents()

    return (
        <>
            <EventsSearch/>
            <EventList items={events}/>
        </>
    )
}