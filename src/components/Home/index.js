import HomeData from '../../homeData';
import Hero from '../../components/Hero';
import CoverRow from '../../components/CoverRow';
function Home() {
    return (
        <div className="content">
            <div className="new-releases">
                <Hero />
            </div>
            <div className="content-listing">
                <h2>Recommended for you</h2>
                <CoverRow comicsData={HomeData.recommended} />
            </div>
            <div className="content-listing">
                <h2>Popular</h2>
                <CoverRow comicsData={HomeData.popular} showRanking={true} />
            </div>
            <div className="content-listing">
                <h2>Continue Reading</h2>
                <CoverRow comicsData={HomeData.continue} />
            </div>
            <div className="content-listing">
                <h2>Walk Through Comics</h2>
                <CoverRow comicsData={HomeData.walkthru} />
            </div>
            <div className="content-listing">
                <h2>Morality Comics</h2>
                <CoverRow comicsData={HomeData.morality} />
            </div>
        </div>
    )
}

export default Home;