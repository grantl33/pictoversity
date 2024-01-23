import "./followingButton.css"
import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";
import { followCreator, unfollowCreator } from "../../api";
import { isNullOrUndefined } from "../../utils";

function FollowingButton(props) {
    const { creatorData } = props;
    const mainContext = useMainContext();
    const {
        member,
        followingCreators
    } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const followingCreator = !isNullOrUndefined(followingCreators)
        ? followingCreators.find((followingCreator) => followingCreator.CREATOR_ID === creatorData.Id)
        : null;
    const isFollowing = !isNullOrUndefined(followingCreator);

    const handleAddFollowCreator = () => {
        if (isNullOrUndefined(member)) {
            dispatch({
                type: "setAlertText",
                alertText: "Please login/register first!"
            });
        } else {
            followCreator(dispatch, member.Id, creatorData);
        }
    }
    const handleRemoveFollowCreator = () => {
        if (!isNullOrUndefined(followingCreator)) {
            unfollowCreator(dispatch, followingCreator.Id, member.Id, creatorData);
        }
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