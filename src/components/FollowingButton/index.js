import "./followingButton.css"
import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";

function FollowingButton(props) {
    const { creatorData } = props;
    const mainContext = useMainContext();
    const { followingCreators } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const isFollowing = followingCreators != null &&
        creatorData != null &&
        followingCreators.includes(creatorData.Id);

    const handleAddFollowCreator = () => {
        dispatch({
            type: "addFollowCreator",
            creatorId: creatorData.Id,
            alertText: `Following ${creatorData.NAME}`
        });
    }
    const handleRemoveFollowCreator = () => {
        dispatch({
            type: "removeFollowCreator",
            creatorId: creatorData.Id,
            alertText: `Unfollowed ${creatorData.NAME}`
        });
    }

    return (
        <>
            {(isFollowing)
                ? <button className="follow-button unfollow" onClick={handleRemoveFollowCreator}>Unfollow</button>
                : <button className="follow-button" onClick={handleAddFollowCreator}>Follow</button>}
        </>
    )
}

export default FollowingButton;