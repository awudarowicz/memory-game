import { useSelector } from "react-redux";
import moment from "moment";
import Moment from "react-moment";
import {selectScores} from "./scoreboardSlice";

export default function Scoreboard(props) {
    const scores = useSelector(selectScores);
    let content;

    if (scores.length > 0) {
        content = scores.map((item, index) => {
            const stopMoment = moment(item.stopTime);

            return (
                <li className="py-2 px-5 text-xl border-t-2 border-white" key={ index }>
                    <strong>{ item.clicks }</strong> clicks
                    on <Moment format="DD.MM.YYYY HH:mm">{ stopMoment }</Moment> </li>)
        }
        );
    }
    else {
        content = <p className="p-10 bg-gray-500">You will see your best results after completing at least one game.</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-white text-3xl">Scoreboard</h2>
            <p className="text-white">Best 10 results</p>

            <ol className="text-white mt-4">
                {content}
            </ol>
        </div>
    )
}