import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const Transaction = ({ isOpen, onClose, onOpen, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.912)" height="auto">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>hello bro</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Transaction;
