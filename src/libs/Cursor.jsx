'use client';

import {useEffect} from 'react';
import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

export default function CursorWrapper() {
  useEffect(() => {
    MouseFollower.registerGSAP(gsap);

    const cursorInstance = new MouseFollower({
      hiddenState: '--hidden',
      textState: '--text',
      iconState: '--icon',
      activeState: '--active',
      mediaState: '--media',
      skewingIcon: 0,
      skewing: 0,
      skewingText: 0,
    });

    return () => {
      if (cursorInstance) {
        cursorInstance.destroy();
      }
    };
  }, []);

  return null;
}
