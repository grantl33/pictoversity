
function Hero(props) {
    const { comicData } = props;
    const {
        title,
        coverImage
    } = comicData;

    const style = {
        backgroundImage: `url('${coverImage}')`
    };
    return (
        <div className="hero" style={style} >
            <span>{title}</span>
        </div>
    )
}

export default Hero;