import Link from "next/link"

export default function overviewPage (){
    return (
        <div>
            <Link href='/management/create'>Create post</Link>
            <div>overview...</div>
        </div>
    )
}