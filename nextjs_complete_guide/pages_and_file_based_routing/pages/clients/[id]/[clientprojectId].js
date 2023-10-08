import {useRouter} from "next/router";

export default function SelectedClientProjectPage() {
    const router = useRouter()

    console.log(router.query)

    return (
        <>
            <h1>The Project Page for a Specific Project for a Selected Client</h1>
        </>
    )
}