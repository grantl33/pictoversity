import Hero from '../../components/Hero';
import CoverRow from '../../components/CoverRow';
import { useMainContext, useMainDispatchContext } from '../../MainContext';
import { useEffect } from 'react';
import { loadAppInfo } from '../../api';
import { isNullOrUndefined } from '../../utils';
import LoadingSpinner from '../LoadingSpinner';
function Home() {
    const dispatch = useMainDispatchContext();
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        appInfo,
        comics,
        loadingComics,
        loadingCreators
    } = mainContext;

    useEffect(() => {
        loadAppInfo(dispatch);
    }, [dispatch]);

    useEffect(() => {
        const appInfoObj = (!isNullOrUndefined(appInfo) && appInfo.length > 0)
            ? appInfo[0]
            : null;
        if (!isNullOrUndefined(appInfoObj)) {
            const appVersion = appInfoObj.APP_VERSION;
            if (!isNullOrUndefined(appVersion)) {
                const appVersionLocal = localStorage.getItem("appVersion");
                if (!isNullOrUndefined(appVersionLocal) && appVersion !== parseInt(appVersionLocal)) {
                    // Version has changed, refresh the app
                    localStorage.removeItem("appVersion");
                    window.location.replace("/");
                    return;
                } else {
                    localStorage.setItem("appVersion", appVersion);
                }
            }
        }
    }, [appInfo]);

    const recommended = (comics && comics.length > 0)
        ? comics.toSorted((a, b) => a.Id - b.Id)
        : null;
    const popular = (comics && comics.length > 0)
        ? comics.toSorted((a, b) => b.EPISODE_COUNT - a.EPISODE_COUNT)
        : null;
    const newest = (comics && comics.length > 0)
        ? comics.toSorted((a, b) => b.Id - a.Id)
        : null;

    return (
        <div className="content">
            <div className="new-releases">
                <Hero />
            </div>
            {(loadingComics || loadingCreators) &&
                <LoadingSpinner />
            }
            {(!loadingComics && !loadingCreators) &&
                <>
                    <div className="content-listing">
                        <h2>Recommended for you</h2>
                        <CoverRow comicsData={recommended} />
                    </div>
                    <div className="content-listing">
                        <h2>Popular</h2>
                        <CoverRow comicsData={popular} showRanking={true} maxItems={10} />
                    </div>
                    <div className="content-listing">
                        <h2>Newest</h2>
                        <CoverRow comicsData={newest} />
                    </div>
                </>
            }
        </div>
    )
}

export default Home;