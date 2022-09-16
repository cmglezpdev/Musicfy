import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';

import './player.scss';


export const Player = ({ songData }) => {

    const [playing, setPlaying] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [volume, setVolume] = useState(.3);

    useEffect(() => {
        if( songData?.url ) onStart();
    }, [songData?.url])


    const onStart = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolume = (e, data) => setVolume(Number(data.value));
    const onProgress = (data) => {
        const { playedSeconds, loadedSeconds } = data;
        setPlayedSeconds(playedSeconds);
        setTotalSeconds(loadedSeconds)
    }

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={4} className="left">
                    <Image src={songData?.image}/>
                    { songData?.name }
                </Grid.Column>
                
                <Grid.Column width={8} className="center">
                    <div className='controls'>
                        {   
                            playing
                            ? (<Icon name='pause circle outline' onClick={onPause} />) 
                            : (<Icon name='play circle outline' onClick={onStart} />)
                        }
                    </div>
                    <Progress 
                        progress="value"
                        value={playedSeconds}
                        total={totalSeconds}
                        size="tiny"
                    />
                </Grid.Column>
                
                <Grid.Column width={4} className="right">
                    <Input 
                        type='range'
                        label={<Icon name="volume up" />}
                        min={0} max={1}
                        step={0.01}
                        name="volume"
                        value={volume}
                        onChange={onVolume}
                    />
                </Grid.Column>
            </Grid>

            <ReactPlayer 
                className="react-player"
                url={songData?.url}
                playing={playing}
                height="0" width="0"
                volume={volume}
                onProgress={onProgress}
            />
        </div>
    )
}
