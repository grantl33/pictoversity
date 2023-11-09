import troubleTrio from "./assets/covers/trouble_trio.jpg";
import sliceOfLife from "./assets/covers/a_slice_of_life.jpg";
import catAdventure from "./assets/covers/the_cat_adventure.jpg";
import baddingtownBC from "./assets/covers/baddingtown_bc.jpg";

import troubleTrioEp1 from "./assets/covers/trouble_trio_ep1.png";
import sliceOfLifeEp1 from "./assets/covers/a_slice_of_life_ep1.png";
import catAdventureEp1 from "./assets/covers/the_cat_adventure_ep1.png";
import baddingtownBCEp1 from "./assets/covers/baddingtown_bc_ep1.png";

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
    }
}

export default ComicData;