import { useSelector } from "react-redux";
import {selectClicks, selectStartTime, selectStopTime} from "../cards/cardsSlice";
import moment from "moment";

export default function WinModal(props) {
    const clicks = useSelector(selectClicks);
    const startTime = useSelector(selectStartTime);
    const stopTime = useSelector(selectStopTime);
    const elapsedSeconds = moment(stopTime).diff(moment(startTime), 'seconds');
    let elapsedTimeText = '';

    if (elapsedSeconds > 60) {
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds - (minutes * 60)
        const minutesText = minutes > 1 ? `${minutes} minutes` : `1 minute`;
        const secondsText = seconds > 1 ? `${seconds} seconds` : `1 second`;

        elapsedTimeText = `${minutesText} and ${secondsText}`;
    }
    else {
        elapsedTimeText = `${elapsedSeconds} seconds`;
    }

    return (
        <div className="absolute bg-gray-500 h-screen w-screen top-0 left-0">
            <div className="absolute bg-green-500 w-1/2 h-1/2 top-1/4 left-1/4 text-center">
                <p className="text-white text-5xl font-bold pt-10">You Win!</p>
                <p className="text-white text-xl  mt-10">in <b>{ elapsedTimeText }</b><br />with <b>{ clicks }</b> clicks</p>

                <button className="rounded-2xl p-5 bg-indigo-800 text-white text-2xl uppercase mt-20" onClick={props.onClick}>Start new game</button>
            </div>
        </div>
    )
}