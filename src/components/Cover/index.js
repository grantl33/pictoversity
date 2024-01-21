import { NavLink } from "react-router-dom";
import rank01 from "../../assets/rank_01.svg";
import rank02 from "../../assets/rank_02.svg";
import rank03 from "../../assets/rank_03.svg";
import rank04 from "../../assets/rank_04.svg";
import rank05 from "../../assets/rank_05.svg";
import rank06 from "../../assets/rank_06.svg";
import rank07 from "../../assets/rank_07.svg";
import rank08 from "../../assets/rank_08.svg";
import rank09 from "../../assets/rank_09.svg";
import rank10 from "../../assets/rank_10.svg";

const rankingNumbers = [
    rank01,
    rank02,
    rank03,
    rank04,
    rank05,
    rank06,
    rank07,
    rank08,
    rank09,
    rank10
];
function Cover(props) {
    const {
        comicData,
        ranking,
        showTitle = true
    } = props;
    const {
        Id: id,
        TITLE: title,
        COVER_IMAGE: coverImage
    } = comicData;
    const style = {
        backgroundImage: `url('/images/covers/${coverImage}.png')`
    }
    const rankingNumber = rankingNumbers[ranking - 1];
    return (
        <NavLink to={`/details?id=${id}`} className='item-card'>
            <div className='item-cover' style={style}>
                <div className="overlay"></div>
                <img src={rankingNumber} alt={ranking} className="ranking" />
            </div>
            {showTitle && <span>{title}</span>}
        </NavLink>
    )
}

export default Cover;