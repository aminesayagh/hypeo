import { Input } from "@heroui/react";
import { Search } from "@/components/icon";

interface SearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

function SearchInput({ value, onChange, placeholder = "Search" }: SearchInputProps) {
    return (
        <Input 
            value={value}
            onValueChange={onChange}
            placeholder={placeholder}
            variant="bordered"
            startContent={<Search />}
            size="sm"
            radius="sm"
            className="w-full"
        />
    )
}

export { SearchInput }