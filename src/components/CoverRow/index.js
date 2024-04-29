import Cover from "../Cover";

function CoverRow(props) {
    const {
        comicsData,
        showRanking,
    } = props;

    return (
        <div className="items-container">
            <div className="items-row">
                {comicsData &&
                    comicsData.map((comic, idx) =>
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