"use client"
import {

    NavigationMenuLink,

} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
interface Props {
    link:string,
    name:string,
}

const ListItem = (props:Props) => {
    const { link, name } = props
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={`/${link}`}
                   
                    className={ "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"}
                >
                    <div className="text-gray-900">{name}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export default ListItem