import { NavLink } from "react-router-dom";
import rank01 from "../../assets/rank_01.svg";
import rank02 from "../../assets/rank_02.svg";
import rank03 from "../../assets/rank_03.svg";
import rank04 from "../../assets/rank_04.svg";
import rank05 from "../../assets/rank_05.svg";

function Cover(props) {
    const {
        comicData,
        ranking
    } = props;
    const {
        id,
        title,
        coverImage
    } = comicData;
    const style = {
        backgroundImage: `url('${coverImage}')`
    }
    return (
        <NavLink to={`/details?id=${id}`} className='item-card'>
            <div className='item-cover' style={style}>
                <div className="overlay"></div>
                {(ranking === 1) && <img src={rank01} alt="1" className="ranking" />}
                {(ranking === 2) && <img src={rank02} alt="2" className="ranking" />}
                {(ranking === 3) && <img src={rank03} alt="3" className="ranking" />}
                {(ranking === 4) && <img src={rank04} alt="4" className="ranking" />}
                {(ranking === 5) && <img src={rank05} alt="5" className="ranking" />}
            </div>
            <span>{title}</span>
        </NavLink>
    )
}

export default Cover;