import { useState } from 'react';
import ReactPlayer from 'react-player'
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';

import './player.scss';

const songData = {
    image: "https://firebasestorage.googleapis.com/v0/b/musicfy-51048.appspot.com/o/albums%2F67c8f9f7-1baa-4569-9801-b9d507991fa1?alt=media&token=309a023d-4bd9-4a34-a3b7-9a23fb645662",
    name: "Efecto vocales",
}

export const Player = () => {
    
    const { image, name } = songData;

    const [playing, setPlaying] = useState(false);
    const [playerSeconds, setPlayerSeconds] = useState(245);
    const [totalSeconds, setTotalSeconds] = useState(500);
    const [volume, setVolume] = useState(.3);

    const onStart = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolume = (e, data) => setVolume(data.value);

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={4} className="left">
                    <Image src={image}/>
                    { name }
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
                        value={playerSeconds}
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
        </div>
    )
}
