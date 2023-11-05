import {useRouter} from "next/router";
import {getEventById} from "../../data/dummyData";
import {useMemo} from "react";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import EventContent from "../../components/eventDetail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";

export default function EventDetailPage() {
    const router = useRouter()

    const event = useMemo(() => {
        const eventId = router.query.eventId
        const event = getEventById(eventId)

        if (!event) {
            return <ErrorAlert><p>No event found!</p></ErrorAlert>
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