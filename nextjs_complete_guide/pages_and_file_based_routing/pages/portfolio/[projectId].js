import { useRouter } from 'next/router'

export default function PortfolioProjectPage() {
    const router = useRouter()

    console.log(router.pathname) // /portfolio/[projectId]
    console.log(router.query) // going to localhost:3000/portfolio/1 -> {projectId: "1"}

    return (
        <>
            <h1>The Portfolio Project Page for Project {router.query.projectId}</h1>
        </>
    )
}