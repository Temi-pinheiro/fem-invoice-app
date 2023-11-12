/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { AnimatePresence } from 'framer-motion';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import { Modal } from '~/components/UI/Modal';

const ModalContext = createContext<any>({});

interface ModalProvider {
  children: ReactNode;
}

interface ModalProps {
  component?: ReactNode;
  title?: string;
  message?: string;
}

interface ModalActions {
  type: 'ADD_MODAL' | 'REMOVE_MODAL' | 'CLOSE_MODAL';
  payload?: any;
  id: any;
}

const ModalProvider = ({ children }: ModalProvider) => {
  const [state, dispatch] = useReducer((state: any, action: ModalActions) => {
    switch (action.type) {
      case 'ADD_MODAL':
        return [...state, { ...action.payload }];
      case 'CLOSE_MODAL': {
        return state[0].open == false;
      }
      case 'REMOVE_MODAL':
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
              <Modal dispatch={dispatch} key={note.id} id={note.id} {...note} />
            );
          })}
        </AnimatePresence>
      </>
      {children}
    </ModalContext.Provider>
  );
};

export const openModal = () => {
  const dispatch: ({}) => void = useContext(ModalContext);
  return (props: ModalProps) => {
    dispatch({
      type: 'ADD_MODAL',
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export const closeModal = () => {
  const dispatch = useContext(ModalContext);
  return (id: any) => {
    dispatch({
      type: 'REMOVE_MODAL',
      id,
    });
  };
};

export const removeModal = () => {
  const dispatch = useContext(ModalContext);
  return (id: any) => {
    dispatch({
      type: 'REMOVE_MODAL',
      id,
    });
  };
};

export default ModalProvider;
