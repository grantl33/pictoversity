import Hero from '../../components/Hero';
import CoverRow from '../../components/CoverRow';
import { useMainContext } from '../../MainContext';
function Home() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        comics
    } = mainContext;
    const recommended = (comics && comics.length > 0)
        ? comics.toSorted((a, b) => a.Id - b.Id)
        : null;
    const popular = (comics && comics.length > 0)
        ? comics.toSorted((a, b) => b.EPISODE_COUNT - a.EPISODE_COUNT)
        : null;

    return (
        <div className="content">
            <div className="new-releases">
                <Hero />
            </div>
            <div className="content-listing">
                <h2>Recommended for you</h2>
                <CoverRow comicsData={recommended} />
            </div>
            <div className="content-listing">
                <h2>Popular</h2>
                <CoverRow comicsData={popular} showRanking={true} />
            </div>
        </div>
    )
}

export default Home;