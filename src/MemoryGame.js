import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchCards, resetBoard, startTimer} from './features/cards/cardsSlice';
import WinModal from './features/winModal/WinModal';
import Scoreboard from './features/scoreboard/Scoreboard';
import moment from 'moment';
import Spinner from './components/Spinner';
import CardsBoard from './features/cards/CardsBoard';

function MemoryGame() {
    const [win, setWin] = useState(false);
    const dispatch = useDispatch();
    const cardStatus = useSelector(state => state.cards.status)
    let content;

    useEffect(() => {
        dispatch(startTimer(moment.now()));

        if (cardStatus === 'idle') {
            dispatch(fetchCards())
        }
    }, [cardStatus, dispatch])

    const startNewGame = () => {
        dispatch(resetBoard());
        dispatch(fetchCards());
        setWin(false);
    };

    if (cardStatus === 'loading') {
        content = <Spinner />;
    } else if (cardStatus === 'succeeded') {
        content = <CardsBoard setWin={() => setWin(true)} />;
    } else if (cardStatus === 'failed') {
        content = 'error'
    }

    return (
      <div className="memory-game p-10 w-full bg-gray-600">
          <div className="max-w-lg mx-auto">
              {content}
          </div>

          {win && <WinModal onClick={() => startNewGame()}/>}

          <Scoreboard />
      </div>
    );
}

export default MemoryGame;
