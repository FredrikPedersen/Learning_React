import Link from "next/link";
import {useMemo} from "react";
import classes from "./EventItem.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

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
        <li className={classes.item}>
            <img src={"/" + image} alt={title}/>
            <div className={classes.content}>
                <>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{formattedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formattedAddress}</address>
                    </div>
                </>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon/>
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}