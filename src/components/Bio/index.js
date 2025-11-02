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
                        I am someone who loves writing, art, film, music, poetry, comics, and sports all at once.
                        That is a lot. Like most teenagers, I was overwhelmed with juggling between all of these different subjects.
                        When I realized I could connect them through comics and storytelling, my sense of self and direction became stronger.
                        I want to help those that also take interest in multiple things, those who are determined to find themselves
                        by bringing their passions together, not choosing between them.
                        Now, sharing this discovery with others, I hope to show that learning doesn’t have to be limited to classrooms or textbooks.
                        Through comics, we can make every story, including our own, creative, educational, and fun again.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Bio;