import Link from "next/link";
import {useMemo} from "react";

export default function EventItem(props) {
    const {title, image, date, location, id} = props

    const formattedDate = useMemo(() => {
        return new Date(date).toLocaleDateString("nb-no", {
            day: "numeric",
            month: "long",
            year: 'numeric'
        })
    }, [date])

    const formattedAddress = useMemo(() => {
        return location.replace(", ", "\n")
    }, [location])

    const exploreLink = useMemo(() => {
        return {
            pathname: "/events/[eventId]",
            query: {eventId: id}
        }
    }, [id])

    return (
        <li>
            <img src={"/" + image} alt={title}/>
            <div>
                <div>
                    <h2>{title}</h2>
                    <div>
                        <time>{formattedDate}</time>
                    </div>
                    <div>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div>
                    <Link href={exploreLink}>Explore Event</Link>
                </div>
            </div>
        </li>
    )
}