import troubleTrio from "./assets/covers/trouble_trio.jpg";
import sliceOfLife from "./assets/covers/a_slice_of_life.jpg";
import catAdventure from "./assets/covers/the_cat_adventure.jpg";
import baddingtownBC from "./assets/covers/baddingtown_bc.jpg";
import mathwithgraycat from "./assets/covers/mathwithgraycat.png";
import rivals from "./assets/covers/rivals1.png";
import pandagirl from "./assets/covers/panda_girl1.png";
import bobaandchill from "./assets/covers/bobaandchill.png";
import graycatadvice from "./assets/covers/graycat_goodadvice.png";
import catgrab from "./assets/covers/catgrab1.png";
import everyday from "./assets/covers/everyday1.png";
import coachMeCover from "./assets/covers/coach_me_cover.png";

import troubleTrioEp1 from "./assets/covers/trouble_trio_ep1.png";
import sliceOfLifeEp1 from "./assets/covers/a_slice_of_life_ep1.png";
import catAdventureEp1 from "./assets/covers/the_cat_adventure_ep1.png";
import baddingtownBCEp1 from "./assets/covers/baddingtown_bc_ep1.png";
import mathwithgraycatEp1 from "./assets/covers/mathwithgraycat_ep1.png";
import rivalsEp1 from "./assets/covers/rivals_ep1.png";
import rivalsEp2 from "./assets/covers/rivals_ep2.png";
import rivalsEp3 from "./assets/covers/rivals_ep3.png";
import rivalsEp4 from "./assets/covers/rivals_ep4.png";
import rivalsEp5 from "./assets/covers/rivals_ep5.png";
import rivalsEp6 from "./assets/covers/rivals_ep6.png";
import pandagirlEp1 from "./assets/covers/panda_girl1.png";
import bobaandchillEp1 from "./assets/covers/bobaandchill.png";
import graycatadviceEp1 from "./assets/covers/graycat_goodadvice.png";
import catgrabEp1 from "./assets/covers/catgrab.png";
import everydayEp1 from "./assets/covers/everyday1.png";
import everydayEp2 from "./assets/covers/everyday2.png";
import coachMeCoverEp1 from "./assets/covers/coach_me_ep1.png";
import coachMeCoverEp2 from "./assets/covers/coach_me_ep2.png";

import everydayContentEp1 from "./assets/episodes/everyday_ep1.png";
import everydayContentEp2 from "./assets/episodes/everyday_ep2.png";

import coachMeContentEp1 from "./assets/episodes/coach_me/episode_01.jpg";
import coachMeContentEp2 from "./assets/episodes/coach_me/episode_02.jpg";

const ComicData = {
    comic_001: {
        id: "comic_001",
        title: "Trouble Trio",
        creatorId: "creator_001",
        coverImage: troubleTrio,
        summary: "Three friends get into a lot of trouble. Find out who is keeping a secret!",
        episodes: [
            {
                number: 1,
                title: "Episode 1",
                coverImage: troubleTrioEp1,
                contents: ""
            }
        ]
    },
    comic_002: {
        id: "comic_002",
        title: "The Cat Adventure",
        creatorId: "creator_001",
        coverImage: catAdventure,
        summary: "Two mischievous cats, Paws and Lily go on an exciting adventure!",
        episodes: [
            {
                number: 1,
                title: "Episode 1",
                coverImage: catAdventureEp1,
                contents: ""
            }
        ]
    },
    comic_003: {
        id: "comic_003",
        title: "A Slice of Life",
        creatorId: "creator_001",
        coverImage: sliceOfLife,
        summary: "A Slice of life is a collection of daily, one-page comics that captures all of Yumie's weird, funny, silly and random events.",
        episodes: [
            {
                number: 1,
                title: "Episode 1",
                coverImage: sliceOfLifeEp1,
                contents: ""
            }
        ]
    },
    comic_004: {
        id: "comic_004",
        title: "Baddingtown BC",
        creatorId: "creator_002",
        coverImage: baddingtownBC,
        summary: "Jason just wants to have fun playing badminton, which is why he and his friends decide to start a club at school.",
        episodes: [
            {
                number: 1,
                title: "Episode 1",
                coverImage: baddingtownBCEp1,
                contents: ""
            }
        ]
    },
    comic_005: {
        id: "comic_005",
        title: "Math with Graycat",
        creatorId: "creator_001",
        coverImage: mathwithgraycat,
        summary: "Graycat makes learning math fun and easy!",
        episodes: [
            {
                number: 1,
                title: "Episode 1 - What is Math?",
                coverImage: mathwithgraycatEp1,
                contents: ""
            }
        ]
    },
    comic_006: {
        id: "comic_006",
        title: "Rivals",
        creatorId: "creator_001",
        coverImage: rivals,
        summary: "It's Graycat versus Blackcat, whose side are you on?",
        episodes: [
            {
                number: 1,
                title: "Please forgive me!",
                coverImage: rivalsEp1,
                contents: ""
            },
            {
                number: 2,
                title: "New kids comes in.",
                coverImage: rivalsEp2,
                contents: ""
            },
            {
                number: 3,
                title: "The big surprise.",
                coverImage: rivalsEp3,
                contents: ""
            },
            {
                number: 4,
                title: "Better than you!",
                coverImage: rivalsEp4,
                contents: ""
            },
            {
                number: 5,
                title: "Practice makes perfect.",
                coverImage: rivalsEp5,
                contents: ""
            },
            {
                number: 6,
                title: "Not your friend.",
                coverImage: rivalsEp6,
                contents: ""
            }
        ]
    },
    comic_007: {
        id: "comic_007",
        title: "Panda Girl & Dede",
        creatorId: "creator_001",
        coverImage: pandagirl,
        summary: "Panda Girl and Dede discuss the stuff that goes on at school.",
        episodes: [
            {
                number: 1,
                title: "Fake friends",
                coverImage: pandagirlEp1,
                contents: ""
            }
        ]
    },
    comic_008: {
        id: "comic_008",
        title: "Boba and Chill",
        creatorId: "creator_002",
        coverImage: bobaandchill,
        summary: "Relax, everything is better when you chill with boba.",
        episodes: [
            {
                number: 1,
                title: "Managing stress before a big test.",
                coverImage: bobaandchillEp1,
                contents: ""
            }
        ]
    },
    comic_009: {
        id: "comic_009",
        title: "Graycat's Good Advice",
        creatorId: "creator_001",
        coverImage: graycatadvice,
        summary: "Graycat has some good advice for you!",
        episodes: [
            {
                number: 1,
                title: "Try to improve 1% every day.",
                coverImage: graycatadviceEp1,
                contents: ""
            }
        ]
    },
    comic_010: {
        id: "comic_010",
        title: "Cat Grab",
        creatorId: "creator_001",
        coverImage: catgrab,
        summary: "Do you even know what a cat grab is???",
        episodes: [
            {
                number: 1,
                title: "Grabbing cats isn't easy!",
                coverImage: catgrabEp1,
                contents: ""
            }
        ]
    },
    comic_011: {
        id: "comic_011",
        title: "Everyday Comics",
        creatorId: "creator_001",
        coverImage: everyday,
        summary: "Just comics about everyday life, y'know???",
        episodes: [
            {
                number: 1,
                title: "Oops, my bad!",
                coverImage: everydayEp1,
                contents: everydayContentEp1
            },
            {
                number: 2,
                title: "While in the car...",
                coverImage: everydayEp2,
                contents: everydayContentEp2
            }
        ]
    },
    comic_012: {
        id: "comic_012",
        title: "Coach Me!",
        creatorId: "creator_001",
        coverImage: coachMeCover,
        summary: "Getting fit is not easy. Sometimes you just need a coach!",
        episodes: [
            {
                number: 1,
                title: "What am I doing wrong?",
                coverImage: coachMeCoverEp1,
                contents: coachMeContentEp1
            },
            {
                number: 2,
                title: "Don't lecture me!",
                coverImage: coachMeCoverEp2,
                contents: coachMeContentEp2
            }
        ]
    }
}

export default ComicData;