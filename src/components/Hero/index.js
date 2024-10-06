import introvideo from "../../assets/pictoversity_intro.mp4";
import posterImage from "../../assets/video_poster.png";

function Hero(props) {
    return (
        <div className="hero">
            <video poster={posterImage} controls>
                <source src={introvideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Hero;