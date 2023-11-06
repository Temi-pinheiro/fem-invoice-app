import { motion } from 'framer-motion';
import './styles.css';

interface PanesProps {
  panes: Array<{
    id: string;
    label: string;
    value?: number;
    show?: boolean;
  }>;

  active: string;
  handleChange: (id: any) => void;
}

export const Panes = ({ panes, active, handleChange }: PanesProps) => {
  //todo make sure that the setactive prop is passed down as a prop

  return (
    <motion.div>
      <ul className='pane-conatiner'>
        {panes
          ?.filter((pane) => pane.show)
          .map((pane: { id: string; label: string; value?: number }) => (
            <li className='pane' key={pane.id}>
              <motion.button
                onClick={() => handleChange(pane.id)}
                key={pane.label}
              >
                <div className='flex items-center gap-x-[10px]'>
                  <span
                    className={`pane-label ${
                      active == pane.id && 'pane-label--active'
                    }`}
                  >
                    {pane.label}
                  </span>
                  {!!pane.value?.toString() && (
                    <span
                      className={`pane-value ${
                        active == pane.id
                          ? 'pane-value--active'
                          : 'pane-value--inactive'
                      }`}
                    >
                      {pane.value}
                    </span>
                  )}
                </div>
              </motion.button>
              {active == pane.id && (
                <motion.div
                  className='pane-underline'
                  layoutId={location.pathname}
                ></motion.div>
              )}
            </li>
          ))}
      </ul>
    </motion.div>
  );
};
