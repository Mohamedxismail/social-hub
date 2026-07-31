export default async function UnreadCountNotifi() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/unReadNotifi`, {
        method: "GET",
        credentials: "include"
    })

    const data = await res.json()
    console.log(data);

    return (
        <div>
            {data.data.count}
        </div>
    )
}
