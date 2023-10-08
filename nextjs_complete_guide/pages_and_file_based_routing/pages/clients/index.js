import Link from "next/link";

export default function ClientsPage() {
    return (
        <>
            <h1>The Clients Page</h1>
            <ul>
                <li>
                    <Link href={"/clients/Fredrik"}>Fredrik</Link>
                </li>
                <li>
                    <Link href={"/clients/Thomas"}>Thomas</Link>
                </li>
                <li>
                    <Link href={"/clients/Jokke"}>Jokke</Link>
                </li>
            </ul>
        </>
    )
}