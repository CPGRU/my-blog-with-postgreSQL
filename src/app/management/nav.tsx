import Link from "next/link";
import Image from "next/image";

export default function Nav({children}: {children: React.ReactNode}){
    return (
        <div className="container">
                <div className="flex items-center justify-between h-32">
                    <div className="ml-10">
                        <Link href="/">
                            <Image src='/logo.png' alt='logo' width={200} height={200} />
                        </Link>
                    </div>
                
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}