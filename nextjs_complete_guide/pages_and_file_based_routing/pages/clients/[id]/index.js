import {useRouter} from "next/router";
import {useCallback} from "react";

export default function ClientProjectsPage() {
    const router = useRouter()

    const loadProjectHandler = useCallback(() => {
        router.push({
            pathname: "/clients/[id]/[clientprojectId]",
            query: {id: "fredrik", clientprojectId: "a"}
        })
    }, [router])

    return (
        <>
            <h1>The Projects of Client {router.query.id}</h1>
            <button onClick={loadProjectHandler}>Load Project A</button>
        </>
    )
}