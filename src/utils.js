import moment from "moment-timezone";
import { ReactComponent as MemberCrown } from "./assets/crown-filled.svg";

export const FULL_MEMBER_TEXT = "You need to be a full member to access this content! Please go to the ID card section for details on how to register and become a full member of Pictoversity!";

export const FULL_MEMBER_TITLE = (
    <div className="modal-title">
        <div><MemberCrown className="crown full-member" /></div>
        <div>Full members only!</div>
    </div>
)
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

export function isBlank(value) {
    return isNullOrUndefined(value) || `${value}`.trim() === "";
}

export function isNotBlank(value) {
    return !isBlank(value);
}

export function getTodaysDate() {
    const today = new Date();
    return `${today.getFullYear()}-${zeroPad(today.getMonth() + 1)}-${zeroPad(today.getDate())}`;
}

export function getTodaysDatetime() {
    const today = new Date();
    const timeStr = (`${zeroPad(today.getHours())}:${zeroPad(today.getMinutes())}:00`)
    return `${getTodaysDate()} ${timeStr}`;
}

export function zeroPad(value) {
    value = `0${value}`;
    return value.substring(value.length - 2);
}

export function isValidInt(value, min, max) {
    const intValue = parseInt(value);
    return Number.isInteger(intValue) && intValue >= min && intValue <= max;
}

export function isValidFullMember(user) {
    if (isNullOrUndefined(user)) return false;
    const today = moment().startOf("day");
    if (!isNullOrUndefined(user.SUBSCRIPTION_EXPIRES_ON)) {
        return (today.isBefore(moment(user.SUBSCRIPTION_EXPIRES_ON).startOf("day")));

    }
    return false;
}

export function getMembershipExpiration(user) {
    if (isNullOrUndefined(user)) return null;

    if (!isNullOrUndefined(user.SUBSCRIPTION_EXPIRES_ON)) {
        return moment(user.SUBSCRIPTION_EXPIRES_ON).format("MM/DD/YYYY")

    }
    return null;
}

