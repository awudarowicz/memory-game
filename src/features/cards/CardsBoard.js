import Card from './Card';
import {
    activateCard,
    addMatch,
    deactivateCard,
    flipCard,
    flipCardsDelayed,
    incrementClicks, selectActiveCardIndex, selectCards, selectClicks, selectMatches,
    stopTimer
} from './cardsSlice';
import moment from 'moment';
import {addScore} from '../scoreboard/scoreboardSlice';
import {useSelector, useDispatch} from 'react-redux';

export default function CardsBoard(props) {

    const cardsQuantity = 24;
    const cards = useSelector(selectCards);
    const matches = useSelector(selectMatches);
    const activeCardIndex = useSelector(selectActiveCardIndex);
    const clicks = useSelector(selectClicks);
    const dispatch = useDispatch();


    const cardClick = index => {
        const card = cards[index];

        if (card.active) {
            return false;
        }

        if (matches.includes(card.id)) {
            return false;
        }

        dispatch(incrementClicks());
        dispatch(flipCard(index));

        if (activeCardIndex !== null) {
            if (cards[activeCardIndex].id === card.id) {
                dispatch(addMatch(cards[index].id));

                if (matches.length + 1 >= cardsQuantity/2) {
                    dispatch(stopTimer(moment.now()));
                    dispatch(addScore({
                        stopTime: moment.now(),
                        clicks: clicks + 1
                    }));
                    props.setWin(true);
                }
            }
            else {
                dispatch(deactivateCard());
                dispatch(flipCardsDelayed([activeCardIndex, index]));
            }
        }
        else {
            dispatch(activateCard(index));
        }
    };

    const content = cards.map((card, index) =>  <Card id={card.id} imageUrl={card.imageUrl} key={index} active={card.active} onClick={() => cardClick(index)} /> )

    return (
        <div className="inline-grid grid-cols-4 gap-4">
            { content }
        </div>
    );
}