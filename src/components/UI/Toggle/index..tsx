import { motion } from 'framer-motion';

import './styles.css';

interface ToggleProps {
  isOn: boolean;
  effect: () => void;
}

export const Toggle = ({ isOn, effect }: ToggleProps) => {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div>
      <motion.button
        className='toggle-container'
        type='button'
        data-isOn={isOn}
        onClick={effect}
      >
        <motion.div
          className='toggle-switch'
          animate={{ x: isOn ? 16 : 0 }}
          transition={spring}
        />
      </motion.button>
      {/* //Add loader */}
    </div>
  );
};
