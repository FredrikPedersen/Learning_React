import {useRouter} from "next/router";

export default function ClientProjectsPage() {
    const router = useRouter()

    return (
        <>
            <h1>The Projects of Client {router.query.id}</h1>
        </>
    )
}