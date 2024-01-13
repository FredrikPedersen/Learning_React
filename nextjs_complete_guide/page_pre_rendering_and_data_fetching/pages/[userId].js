export default function UserIdPage(props) {
    return <h1>{props.id}</h1>
}

export async function getServerSideProps(context) {
    const { params } = context

    return {
        props : {
            id: "userId-" + params.userId
        }
    }
}