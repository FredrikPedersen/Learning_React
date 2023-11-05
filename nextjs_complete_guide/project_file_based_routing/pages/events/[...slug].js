import {useRouter} from "next/router";
import {getFilteredEvents} from "../../data/dummyData";

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
        return <p>Invalid filters, please adjust your values!</p>
    }

    const filteredEvents = getFilteredEvents({year: yearFilter, month: monthFilter})

    if (!filteredEvents || filteredEvents.length === 0) {
        return <p>No events found for the chosen filter!</p>
    }

    return (
        <>
            <h1>Filtered Events</h1>
        </>
    )
}