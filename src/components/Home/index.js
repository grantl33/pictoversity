import HomeData from '../../homeData';
import Hero from '../../components/Hero';
import CoverRow from '../../components/CoverRow';
import bell from '../../assets/icons/bell-fill.svg'
import search from '../../assets/icons/search.svg'
import home from '../../assets/icons/house-fill.svg'
import locker from '../../assets/icons/locker.svg'
import idcard from '../../assets/icons/person-vcard.svg'
function Home() {
    return (
        <>
            <header>
                <div className="row">
                    <div className="header-left">
                        Pictoversity
                    </div>
                    <div className="header-right">
                        <img className="icon" src={bell} alt="" />
                        <img className="icon" src={search} alt="" />
                    </div>
                </div>
            </header>
            <main>
                <div className="content">
                    <div className="new-releases">
                        <h2>New Releases</h2>
                        <Hero comicData={HomeData.new} />
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
            </main >
            <footer>
                <nav className="row">
                    <div className="main-link selected">
                        <img src={home} alt="" />
                        <span>Home</span>
                    </div>
                    <div className="main-link">
                        <img src={locker} alt="" />
                        <span>Locker</span>
                    </div>
                    <div className="main-link">
                        <img src={idcard} alt="" />
                        <span>ID</span>
                    </div>
                </nav>
            </footer>
        </>
    )
}

export default Home;