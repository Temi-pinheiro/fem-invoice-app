/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { AnimatePresence } from 'framer-motion';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import { SideModal } from '~/components/UI/SideModal';

const ModalContext = createContext<any>({});

interface SideModalProvider {
  children: ReactNode;
}

interface SideModalProps {
  component?: ReactNode;
  title?: string;
  message?: string;
}

interface ModalActions {
  type: 'SLIDE_IN' | 'SLIDE_OUT';
  payload?: any;
  id: any;
}

const SideModalProvider = ({ children }: SideModalProvider) => {
  const [state, dispatch] = useReducer((state: any, action: ModalActions) => {
    switch (action.type) {
      case 'SLIDE_IN':
        return [...state, { ...action.payload }];

      case 'SLIDE_OUT':
        return state.filter((el: any) => el.id !== action.id);

      default:
        return state;
    }
  }, []);

  return (
    <ModalContext.Provider value={dispatch}>
      <>
        <AnimatePresence>
          {state.map((note: any) => {
            return (
              <SideModal
                dispatch={dispatch}
                key={note.id}
                id={note.id}
                {...note}
              />
            );
          })}
        </AnimatePresence>
      </>
      {children}
    </ModalContext.Provider>
  );
};

export const slideInModal = () => {
  const dispatch: ({}) => void = useContext(ModalContext);
  return (props: SideModalProps) => {
    dispatch({
      type: 'SLIDE_IN',
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export const slideOutModal = () => {
  const dispatch = useContext(ModalContext);
  return (id: any) => {
    dispatch({
      type: 'SLIDE_OUT',
      id,
    });
  };
};

export default SideModalProvider;
