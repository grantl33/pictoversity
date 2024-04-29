import Cover from "../Cover";

function CoverRow(props) {
    const {
        comicsData,
        showRanking,
        maxItems
    } = props;

    const comicsList = (maxItems > 0 && comicsData?.length > maxItems) ?
        comicsData.splice(maxItems) : comicsData;

    return (
        <div className="items-container">
            <div className="items-row">
                {comicsList &&
                    comicsList.map((comic, idx) =>
                        <Cover key={`${comic.id}-${idx}`}
                            comicData={comic}
                            ranking={showRanking ? idx + 1 : null}
                        />)
                }
            </div>
        </div>
    )
}

export default CoverRow;