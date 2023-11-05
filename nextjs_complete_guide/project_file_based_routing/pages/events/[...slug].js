import {useRouter} from "next/router";
import {getFilteredEvents} from "../../data/dummyData";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

export default function FilteredEventsPage() {
    const router = useRouter()
    const filterData = router.query.slug

    if (!filterData) {
        return <p className='center'>Loading...</p>
    }

    const yearFilter = +filterData[0]
    const monthFilter = +filterData[1]

    if (isNaN(yearFilter) ||
        isNaN(monthFilter) ||
        yearFilter > 2030 ||
        yearFilter < 2021 ||
        monthFilter < 1 ||
        monthFilter > 12) {
        return (
            <>
                <ErrorAlert><p>Invalid filters, please adjust your values!</p></ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </>
        )

    }

    const filteredEvents = getFilteredEvents({year: yearFilter, month: monthFilter})

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </>
        )
    }

    const date = new Date(yearFilter, monthFilter - 1)

    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    )
}