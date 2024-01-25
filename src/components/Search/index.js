import "./styles.css";
import search from '../../assets/icons/search.svg'
import { useMainContext } from '../../MainContext';
import { useEffect, useState } from 'react';
import { isNullOrUndefined } from '../../utils';
import Cover from '../Cover';
function Search() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        comics,
        creators
    } = mainContext;

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([...creators]);
    useEffect(() => {
        if (isNullOrUndefined(comics)) return;
        setResults(comics.filter((comics) => {
            return comics.TITLE.toLowerCase().includes(searchQuery);
        }));
    }, [searchQuery, comics]);
    return (
        <div className="search">
            <div className="search-bar">
                <div className="search-bar-field">
                    <input type="text" value={searchQuery} placeholder="Search here" onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }} />
                    <img className="search-icon" src={search} alt="" />
                </div>
            </div>
            <div className="search-results">
                <div className="search-results-container">
                    {results &&
                        results.map((comic, idx) =>
                            <Cover key={`${comic.id}-${idx}`}
                                comicData={comic}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;