'use client'

import { useEffect, useRef  } from 'react';

import { Player } from '@lordicon/react';

const about
 = require('/public/images/about.json');


const page = () => {

  const playerRef = useRef(null);
  
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

    return(
        <>
            <Player
                ref={playerRef}
                size={120}
                icon={about}
                onComplete={() => {
                setTimeout(() => {
                    playerRef.current?.playFromBeginning();
                }, 4000);
                }}
                styles={{
                flex: 1,
                gap: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                }}
            />
        </>
    )
}

export default page;