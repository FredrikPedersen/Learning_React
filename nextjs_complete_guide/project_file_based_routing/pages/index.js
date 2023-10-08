import {getFeaturedEvents} from "../data/dummyData";
import EventList from "../components/events/EventList";

export default function HomePage() {
    const featuredEvents = getFeaturedEvents()

    return (
        <>
            <EventList items={featuredEvents}/>
        </>
    )
}