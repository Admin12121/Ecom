import { createContext, useContext, useState } from 'react';
const CartContext = createContext(null);

export const useCart = () => {
  const [counter, setCounter] = useState(0);

  const addToCart = async (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const dot = createCartDot();
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
    dot.style.top = `${buttonRect.top + window.scrollY - 285}px`;
    dot.style.left = `${buttonRect.left + window.scrollX -35}px`;

    document.body.appendChild(dot);

    // Set initial size and shape
    dot.style.width = '320px';
    dot.style.height = '355px';
    dot.style.borderRadius = '8px';
    dot.style.background = '#8c52c580';

    requestAnimationFrame(() => {
      // Trigger the transition
      dot.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, border-radius 1s ease-in-out, transform 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out';
      dot.style.width = '20px';
      dot.style.height = '20px';
      dot.style.borderRadius = '50%';
    //   dot.style.background = '#f31261b3';

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

  return { counter, addToCart };
};
