import React, { createContext, useContext, useState ,ReactNode} from 'react';
import useAuth from "@/context/AuthContext";
import { useDisclosure } from "@nextui-org/react";
interface CartContextType {
  counter: number;
  addToCart: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
  onOpenChange: () => void; 
}
interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ( {children} ) => {
  const [counter, setCounter] = useState(0);
  const { isLoggedIn } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    // if (!isLoggedIn) {
    //   onOpen(); 
    //   return; 
    // }
    const dot = createCartDot();
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
    dot.style.top = `${buttonRect.top + window.scrollY - 285}px`;
    dot.style.left = `${buttonRect.left + window.scrollX - 35}px`;

    document.body.appendChild(dot);
    dot.style.width = '320px';
    dot.style.height = '355px';
    dot.style.borderRadius = '8px';
    dot.style.background = '#8c52c580';

    requestAnimationFrame(() => {
      dot.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, border-radius 1s ease-in-out, transform 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out';
      dot.style.width = '20px';
      dot.style.height = '20px';
      dot.style.borderRadius = '50%';

      moveDotToTarget(dot).then(() => {
        dot.style.transition = 'opacity 0.5s ease-in-out';
        dot.style.opacity = '0';
        dot.addEventListener('transitionend', () => {
          dot.remove();
          incrementCounter();
        }, { once: true });
      });
    });
  };

  const moveDotToTarget = (dot: HTMLElement): Promise<void> => {
    return new Promise((resolve) => {
      const counterElement = document.getElementById('js-shopping-bag-counter');
      if (counterElement) {
        const targetRect = counterElement.getBoundingClientRect();
        dot.style.top = `${targetRect.top + window.scrollY}px`;
        dot.style.left = `${targetRect.left + window.scrollX}px`;
        dot.addEventListener('transitionend', () => resolve(), { once: true });
      } else {
        resolve();
      }
    });
  };

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const createCartDot = (): HTMLElement => {
    const dot = document.createElement('div');
    dot.classList.add('product__dot');
    dot.style.opacity = '1';
    (dot.style as any).viewTransitionName = 'cart-dot';
    return dot;
  };

  return (
    <CartContext.Provider value={{ counter, addToCart, isOpen, onOpenChange }}>
      {children}
    </CartContext.Provider>
  );
};
