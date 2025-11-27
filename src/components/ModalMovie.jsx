import { useEffect } from 'react';
import Modal from 'react-responsive-modal';
import { useMovie } from '../hooks/useMovie';

export const ModalMovie = ({ openModal, onCloseModal, id }) => {
  const movie = useMovie(openModal ? id : null);

  useEffect(() => {
    if (openModal === true) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }
  }, [openModal]);

  return (
    <Modal open={openModal} onClose={onCloseModal} center blockScroll={false}>
      <h2 className="text-black">{movie?.description}</h2>
    </Modal>
  );
};
