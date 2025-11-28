import Modal from 'react-responsive-modal';
import { useMovie } from '../hooks/useMovie';
import { Spinner } from './Spinner';

export const ModalMovie = ({ openModal, onCloseModal, id }) => {
  const { movie, isLoading } = useMovie(openModal ? id : null);

  console.log(movie);
  return (
    <Modal open={openModal} onClose={onCloseModal} center blockScroll={false}>
      {isLoading && <Spinner />}
      {!isLoading && movie && <h2>{movie.nameRu || movie.nameOriginal}</h2>}
    </Modal>
  );
};
