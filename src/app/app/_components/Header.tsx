import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { SearchInput } from "@/components/search-input";

export function Header({ height }: { height: number }) {
    // --------------------------------------------------
    // Configuration
    // --------------------------------------------------

    // --------------------------------------------------
    // Search feature
    // --------------------------------------------------

    return (
        <Navbar height={height} >
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <SearchInput />
            </NavbarContent>
            <NavbarContent className="sm:hidden pr-3" justify="end">
            </NavbarContent>
        </Navbar>
    )
}

