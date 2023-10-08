import Link from "next/link";

export default function HomePage() {
    const clients = [
        {id: "fredrik", name: "Fredrik"},
        {id: "thomas", name: "Thomas"},
        {id: "jokke", name: "Jokke"},
    ]

    return (
        <>
            <h1>The Home Page</h1>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: {
                                id: client.id
                            }
                        }}>{client.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}