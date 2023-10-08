import {useRouter} from "next/router";

export default function BlogPostsPage() {
    const router = useRouter()
    const slug = router.query.slug

    return (
        <>
            {slug
                ? <h1>The Blog Posts for {slug.map(queryParam => queryParam + "/")}</h1>
                : <p>Loading...</p>
            }
        </>
    )
}