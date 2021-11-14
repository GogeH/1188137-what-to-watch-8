import { MouseEventHandler, memo } from 'react';

function PlayButton(onPlayButtonClick: {
  isPlay: boolean,
  isReady: boolean,
  playButtonClickHandler: MouseEventHandler<HTMLButtonElement>,
} ): JSX.Element {
  const { isPlay, isReady, playButtonClickHandler} = onPlayButtonClick;

  return (
    <button type="button" className="player__play" disabled={!isReady} onClick={playButtonClickHandler}>
      {!isPlay ?
        <>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </> :
        <>
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"/>
          </svg>
          <span>Pause</span>
        </>}
    </button>
  );
}

export default  memo(PlayButton);