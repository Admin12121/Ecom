// import React, { createContext, useContext, useState ,ReactNode} from 'react';
// import useAuth from "@/context/AuthContext";
// import { useDisclosure } from "@nextui-org/react";
// interface CartContextType {
//   counter: number;
//   addToCart: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void;
//   isOpen: boolean;
//   onOpenChange: () => void; 
// }
// interface CartProviderProps {
//   children: ReactNode;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider: React.FC<CartProviderProps> = ( {children} ) => {
//   const [counter, setCounter] = useState(0);
//   const { isLoggedIn } = useAuth();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
//     // if (!isLoggedIn) {
//     //   onOpen(); 
//     //   return; 
//     // }
//     const dot = createCartDot();
//     const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
//     dot.style.top = `${buttonRect.top + window.scrollY - 285}px`;
//     dot.style.left = `${buttonRect.left + window.scrollX - 35}px`;

//     document.body.appendChild(dot);
//     dot.style.width = '320px';
//     dot.style.height = '355px';
//     dot.style.borderRadius = '8px';
//     dot.style.background = '#8c52c580';

//     requestAnimationFrame(() => {
//       dot.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, border-radius 1s ease-in-out, transform 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out';
//       dot.style.width = '20px';
//       dot.style.height = '20px';
//       dot.style.borderRadius = '50%';

//       moveDotToTarget(dot).then(() => {
//         dot.style.transition = 'opacity 0.5s ease-in-out';
//         dot.style.opacity = '0';
//         dot.addEventListener('transitionend', () => {
//           dot.remove();
//           incrementCounter();
//         }, { once: true });
//       });
//     });
//   };

//   const moveDotToTarget = (dot: HTMLElement): Promise<void> => {
//     return new Promise((resolve) => {
//       const counterElement = document.getElementById('js-shopping-bag-counter');
//       if (counterElement) {
//         const targetRect = counterElement.getBoundingClientRect();
//         dot.style.top = `${targetRect.top + window.scrollY}px`;
//         dot.style.left = `${targetRect.left + window.scrollX}px`;
//         dot.addEventListener('transitionend', () => resolve(), { once: true });
//       } else {
//         resolve();
//       }
//     });
//   };

//   const incrementCounter = () => {
//     setCounter((prevCounter) => prevCounter + 1);
//   };

//   const createCartDot = (): HTMLElement => {
//     const dot = document.createElement('div');
//     dot.classList.add('product__dot');
//     dot.style.opacity = '1';
//     (dot.style as any).viewTransitionName = 'cart-dot';
//     return dot;
//   };

//   return (
//     <CartContext.Provider value={{ counter, addToCart, isOpen, onOpenChange }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, ReactNode } from 'react';
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

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const { isLoggedIn } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.target as HTMLElement;
    const cardElement = buttonElement.closest('.clone_element') as HTMLElement;

    if (!cardElement) return;

    const mainContent = cardElement.querySelector('.main-content') as HTMLElement;

    if (!mainContent) return;

    const cardClone = cardElement.cloneNode(true) as HTMLElement;
    const cardRect = cardElement.getBoundingClientRect();

    cardClone.style.position = 'absolute';
    cardClone.style.top = `${cardRect.top + window.scrollY}px`;
    cardClone.style.left = `${cardRect.left + window.scrollX}px`;
    cardClone.style.width = `${cardRect.width}px`;
    cardClone.style.height = `${cardRect.height}px`;
    cardClone.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, border-radius 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out, background-color 1s ease-in-out, opacity 1s ease-in-out';
    cardClone.style.zIndex = '1000';
    
    document.body.appendChild(cardClone);
    
    const mainContentClone = cardClone.querySelector('.main-content') as HTMLElement;
    const imageClone = mainContentClone.querySelector('.animation-background') as HTMLElement;
    imageClone.style.display = "none";
    mainContentClone.style.opacity = '1';
    mainContentClone.style.position = 'relative';
    mainContentClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, top 1s ease-in-out';
    mainContentClone.style.top = '0px';
    
    requestAnimationFrame(() => {
      cardClone.style.width = '20px';
      cardClone.style.height = '20px';
      cardClone.style.borderRadius = '50%';
      cardClone.style.backgroundColor = '#8c52c5';
      cardClone.style.color = 'transparent';
      mainContentClone.style.transform = 'scale(0)';
      mainContentClone.style.opacity = '0';
      mainContentClone.style.top = '250px';
      
      moveDotToTarget(cardClone).then(() => {
        cardClone.style.opacity = '0';
        cardClone.addEventListener('transitionend', () => {
          cardClone.remove();
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

  return (
    <CartContext.Provider value={{ counter, addToCart, isOpen, onOpenChange }}>
      {children}
    </CartContext.Provider>
  );
};
