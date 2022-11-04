import React from 'react';
import ModalProfileForm from '../components/front/ModalProfileForm/index';




export default function useModalForm() {
  const [showModal, setShowModal] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [childreModal, setChildreModal] = React.useState(null);



  const handlerModal = (type: string) => {
    switch (type) {
      case 'avatar':
        setTitleModal('Editar foto de perfil');
        setChildreModal(<ModalProfileForm setShowModal={ setShowModal } />);
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return {
    showModal,
    titleModal,
    childreModal,
    handlerModal,
    setShowModal,

  };
}