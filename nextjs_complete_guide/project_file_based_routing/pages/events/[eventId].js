import {useRouter} from "next/router";
import {getEventById} from "../../data/dummyData";
import {useMemo} from "react";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import EventContent from "../../components/eventDetail/EventContent";

export default function EventDetailPage() {
    const router = useRouter()

    const event = useMemo(() => {
        const eventId = router.query.eventId
        const event = getEventById(eventId)

        if (!event) {
            return <p>No event found!</p>
        }

        return event
    }, [router.query]);


    return (
        <>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}