import { Input } from "@heroui/react";
import { Search } from "@/components/icon";

function SearchInput() {
    return (
        <Input 
            placeholder="Search"
            variant="bordered"
            startContent={<Search />}
            size="sm"
            radius="sm"
            className="w-full"
        />
    )
}

export { SearchInput }