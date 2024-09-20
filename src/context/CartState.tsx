// import React, { createContext, useContext, useState, ReactNode , useEffect} from 'react';
// import useAuth from "@/context/AuthContext";
// import { useDisclosure } from "@nextui-org/react";

// interface CartContextType {
//   counter: number;
//   addToCart: (id: number, event: React.MouseEvent<HTMLButtonElement>, variantId?: number | null) => void;
//   isOpen: boolean;
//   onOpenChange: () => void; 
//   setCounter: (value: number) => void;
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

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   const [counter, setCounter] = useState(0);
//   const { isLoggedIn } = useAuth();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//     setCounter(cartItems.length);
//   }, []);

//   const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>, variantId?: number | null) => {
//     const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
 
//     const buttonElement = event.target as HTMLElement;
//     const cardElement = buttonElement.closest('.clone_element') as HTMLElement;

//     console.log("done 1")
    
//     if (!cardElement) return;

//     const mainContent = cardElement.querySelector('.main-content') as HTMLElement;
    
//     if (!mainContent) return;
    
//     console.log("done 2")
//     const cardClone = cardElement.cloneNode(true) as HTMLElement;
//     const cardRect = cardElement.getBoundingClientRect();

//     cardClone.style.position = 'absolute';
//     cardClone.style.top = `${cardRect.top + window.scrollY}px`;
//     cardClone.style.left = `${cardRect.left + window.scrollX}px`;
//     cardClone.style.width = `${cardRect.width}px`;
//     cardClone.style.height = `${cardRect.height}px`;
//     cardClone.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, border-radius 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out, background-color 1s ease-in-out, opacity 1s ease-in-out';
//     cardClone.style.zIndex = '1000';
    
//     console.log("done 3")
//     document.body.appendChild(cardClone);
    
//     const mainContentClone = cardClone.querySelector('.main-content') as HTMLElement;
//     const imageClone = mainContentClone.querySelector('.animation-background') as HTMLElement;
//     imageClone.style.display = "none";
//     mainContentClone.style.opacity = '1';
//     mainContentClone.style.position = 'relative';
//     mainContentClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, top 1s ease-in-out';
//     mainContentClone.style.top = '0px';
    
//     console.log("done 4")
//     requestAnimationFrame(() => {
//       cardClone.style.width = '20px';
//       cardClone.style.height = '20px';
//       cardClone.style.borderRadius = '50%';
//       cardClone.style.backgroundColor = '#8c52c5';
//       cardClone.style.color = 'transparent';
//       mainContentClone.style.transform = 'scale(0)';
//       mainContentClone.style.opacity = '0';
//       mainContentClone.style.top = '250px';
      
//       moveDotToTarget(cardClone).then(() => {
//         cardClone.style.opacity = '0';
//         cardClone.addEventListener('transitionend', () => {
//           cardClone.remove();
//           console.log("done 5")
          
//           const itemvariantId = variantId && variantId === null ? 1 : variantId;
//           const cartItem = { id, variantId: itemvariantId };
//           if (!cartItems.some((item: any) => item.id === id && item.variantId === itemvariantId)) {
//             cartItems.push(cartItem);
//             localStorage.setItem('cart', JSON.stringify(cartItems));
//             setCounter(cartItems.length);
//           }
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

//   return (
//     <CartContext.Provider value={{ counter, addToCart, isOpen, onOpenChange, setCounter }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode , useEffect} from 'react';
import useAuth from "@/context/AuthContext";
import { useDisclosure } from "@nextui-org/react";

interface CartContextType {
  counter: number;
  addToCart: (id: number, event: React.MouseEvent<HTMLButtonElement>, variantId?: number | null) => void;
  isOpen: boolean;
  onOpenChange: () => void; 
  setCounter: (value: number) => void;
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

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCounter(cartItems.length);
  }, []);

  const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>, variantId?: number | null) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
 
    const buttonElement = event.target as HTMLElement;
    const cardElement = buttonElement.closest('.clone_element') as HTMLElement;
    
    if (!cardElement) return;

    const mainContent = cardElement.querySelector('.main-content') as HTMLElement;
    
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

    if (cardClone.querySelector('.maintext-content')) {
      const mainContentClone = cardClone.querySelector('.maintext-content') as HTMLElement;
      mainContentClone.style.display = 'none';
    }
    
    const mainContentClone = cardClone.querySelector('.main-content') as HTMLElement;
    if (mainContentClone) {
      const imageClone = mainContentClone.querySelector('.animation-background') as HTMLElement;
      if (imageClone) {
        imageClone.style.display = "none";
      }
      mainContentClone.style.opacity = '1';
      mainContentClone.style.position = 'relative';
      mainContentClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, top 1s ease-in-out';
      mainContentClone.style.top = '0px';
    }
    
    requestAnimationFrame(() => {
      cardClone.style.width = '20px';
      cardClone.style.height = '20px';
      cardClone.style.borderRadius = '50%';
      cardClone.style.backgroundColor = '#8c52c5';
      cardClone.style.color = 'transparent';
      if (mainContentClone) {
        mainContentClone.style.transform = 'scale(0)';
        mainContentClone.style.opacity = '0';
        mainContentClone.style.top = '250px';
      }
      
      moveDotToTarget(cardClone).then(() => {
        cardClone.style.opacity = '0';
        cardClone.addEventListener('transitionend', () => {
          cardClone.remove();
          
          const itemvariantId = variantId && variantId === null ? 1 : variantId;
          const cartItem = { id, variantId: itemvariantId , pcs: 1};
          if (!cartItems.some((item: any) => item.id === id && item.variantId === itemvariantId)) {
            cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            setCounter(cartItems.length);
          }
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

  return (
    <CartContext.Provider value={{ counter, addToCart, isOpen, onOpenChange, setCounter }}>
      {children}
    </CartContext.Provider>
  );
};