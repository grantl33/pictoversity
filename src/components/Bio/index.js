import yumie from "../../assets/about/yumie.jpeg"
function Bio() {
    return (
        <div>
            <div className="bio content">
                <div className="centered">
                    <img src={yumie} alt="Yumie Lee" className="image-bio" />
                </div>
                <div>
                    <h2>My Story:</h2>
                    <p>
                        Hi, my name is Yumie Lee. I created this platform because I always had trouble focusing since my school didn’t teach me in ways that would help me become more engaged in my own education. This made me lose interest, thinking that learning in general was always this boring. I then realized that learning new things can be educational, but fun at the same time, It made me want to share educational entertainment for others through my talent and knowledge. Even though something might not be fun to learn about, I wanted to make it as enjoyable as possible, and YEA (Young Entrepreneurs Academy) helped make my business idea come to life. There, I learned how to start up my business and was a lot trying to figure out how Pictoversity would run and how certain things will work. I learned that It was best to start simple and try to grow the business from there. I hope that Pictoversity would expand to inspire many children to keep on learning and growing.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Bio;