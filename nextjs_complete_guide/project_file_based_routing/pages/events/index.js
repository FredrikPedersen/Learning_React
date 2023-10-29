import {getAllEvents} from "../../data/dummyData";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import {useCallback} from "react";
import {useRouter} from "next/router";

export default function AllEventsPage() {
    const events = getAllEvents()
    const router = useRouter()

    const findEventsHandler = useCallback((year, month) => {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }, [])

    return (
        <>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </>
    )
}