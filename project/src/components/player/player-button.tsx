import { MouseEventHandler, memo } from 'react';

function PlayButton(props: {
  isPlay: boolean,
  isReady: boolean,
  onPlayButtonClick: MouseEventHandler<HTMLButtonElement>,
} ): JSX.Element {
  const { isPlay, isReady, onPlayButtonClick} = props;

  return (
    <button type="button" className="player__play" disabled={!isReady} onClick={onPlayButtonClick}>
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
