import {useRouter} from "next/router";

export default function SelectedClientProjectPage() {
    const router = useRouter()

    return (
        <>
            <h1>The Page for Project {router.query.clientprojectId} for Client {router.query.id}</h1>
        </>
    )
}