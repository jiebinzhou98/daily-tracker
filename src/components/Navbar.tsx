"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-aroud py-2 md:hidden">
            <Link
                href="/"
                className={`flex flex-col items-center text-sm 
                    ${pathname === "/" ? "text-blue-500 font-semibold" : "text-gray-600"}`}
            >
                Home
            </Link>
            <Link
                href="/logs"
                className={`flex flex-col items-center text-sm 
                    ${pathname === "/logs" ? "text-blue-500 font-semibold" : "text-gray-600"}`}
            >
                Logs
            </Link>
        </nav>
    )
}