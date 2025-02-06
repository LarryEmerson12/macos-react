'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const SCALE = 2.25;
const DISTANCE = 110;
const NUDGE = 40;
const SPRING = {
  mass: 0.1,
  stiffness: 170,
  damping: 12,
};

interface App {
  name: string;
  icon: string;
}

const APPS: App[] = [
  { name: 'Finder', icon: '/icons/finder.svg' },
  { name: 'Launchpad', icon: '/icons/launchpad.svg' },
  { name: 'Safari', icon: '/icons/safari.svg' },
  { name: 'Notes', icon: '/icons/notes.svg' },
  { name: 'Reminders', icon: '/icons/reminders.svg' },
  { name: 'Messages', icon: '/icons/messages.svg' },
  { name: 'Music', icon: '/icons/apple-music.svg' },
  { name: 'System Preferences', icon: '/icons/system-preferences.svg' },
  { name: 'Bin', icon: '/icons/bin.svg' },
];

export default function Dock() {
  const mouseLeft = useMotionValue(-Infinity);
  const mouseRight = useMotionValue(-Infinity);
  const left = useTransform(mouseLeft, [0, 40], [0, -40]);
  const right = useTransform(mouseRight, [0, 40], [0, -40]);
  const leftSpring = useSpring(left, SPRING);
  const rightSpring = useSpring(right, SPRING);

  return (
    <motion.div
      onMouseMove={(e) => {
        const { left, right } = e.currentTarget.getBoundingClientRect();
        const offsetLeft = e.clientX - left;
        const offsetRight = right - e.clientX;
        mouseLeft.set(offsetLeft);
        mouseRight.set(offsetRight);
      }}
      onMouseLeave={() => {
        mouseLeft.set(-Infinity);
        mouseRight.set(-Infinity);
      }}
      className="mx-auto hidden h-16 items-end gap-3 px-2 pb-3 sm:flex relative"
    >
      {/* Dock Background */}
      <motion.div
        className="absolute rounded-2xl inset-y-0 bg-white/45 backdrop-blur-lg z-0"
        style={{ left: leftSpring, right: rightSpring }}
      />

      {/* App Icons */}
      {APPS.map((app, i) => (
        <AppIcon key={i} mouseLeft={mouseLeft} app={app} />
      ))}
    </motion.div>
  );
}

interface AppIconProps {
  mouseLeft: MotionValue;
  app: App;
}

function AppIcon({ mouseLeft, app }: AppIconProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };

    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);
  const x = useTransform(() => {
    const d = distance.get();
    if (d === -Infinity) {
      return 0;
    } else if (d < -DISTANCE || d > DISTANCE) {
      return Math.sign(d) * -1 * NUDGE;
    } else {
      return (-d / DISTANCE) * NUDGE * scale.get();
    }
  });

  const scaleSpring = useSpring(scale, SPRING);
  const xSpring = useSpring(x, SPRING);
  const y = useMotionValue(0);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            ref={ref}
            style={{ x: xSpring, scale: scaleSpring, y }}
            onClick={() => {
              animate(y, [0, -40, 0], {
                repeat: 2,
                ease: [
                  [0, 0, 0.2, 1],
                  [0.8, 0, 1, 1],
                ],
                duration: 0.7,
              });
            }}
            className="w-12 h-12 rounded-lg overflow-hidden z-10"
          >
            <Image
              src={app.icon}
              alt={app.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              quality={100}
            />
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            className="z-50 bg-gray-700 shadow shadow-black border border-gray-600 px-2 py-1.5 text-sm rounded text-white font-medium"
          >
            {app.name}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}