import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import Image from "next/image";
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const CardModal:React.FC<Props> = ({isOpen, onClose}) => {

  return (
    <>
      <Modal 
      className="absolute top-16 right-5 !m-0"
        size="md"
        backdrop="transparent"
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader  className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
              <Image src="/cart.jpg" alt="Large Image" className="invert" width={3048} height={2024} />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button color="secondary" className="w-full" radius="sm" onPress={onClose}>
                  Continue Shopping
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
