import SearchIcon from '../assets/icons/search.svg?react';

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
    return (
        <div className='bg-grey5 flex gap-1 items-center h-[40px] px-4 rounded-[32px]'>
            <SearchIcon />
            <input type='text' value={value} placeholder='Search' onChange={(e) => onChange(e.target.value)} className='w-full bg-transparent outline-none text-sm' />
        </div>
    )
}

export default Search;