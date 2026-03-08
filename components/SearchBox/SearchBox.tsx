import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 450);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
