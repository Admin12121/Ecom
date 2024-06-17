import React, { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export const ProductIcon = () => {
    const { resolvedTheme } = useNextTheme();
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      if (resolvedTheme !== undefined) {
        setChecked(resolvedTheme === 'dark');
      }
    }, [resolvedTheme]);
  
    return(
        <svg width="35px"  height="35px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Iconly/Light/Bag-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Bag-2" transform="translate(3.000000, 2.500000)"  className={`${checked ? "stroke-white" : "stroke-default-900"}`} strokeWidth="1.5">
                    <path d="M12.7729,6.80503597 L12.7729,3.77303597 C12.7729,1.68903597 11.0839,-1.42108547e-14 9.0009,-1.42108547e-14 C6.9169,-0.00896402892 5.2199,1.67203597 5.2109,3.75603597 L5.2109,3.77303597 L5.2109,6.80503597" id="Stroke-1"></path>
                    <path d="M13.7422153,18.500336 L4.2577847,18.500336 C1.90569395,18.500336 0,16.595336 0,14.245336 L0,8.72933597 C0,6.37933597 1.90569395,4.47433597 4.2577847,4.47433597 L13.7422153,4.47433597 C16.094306,4.47433597 18,6.37933597 18,8.72933597 L18,14.245336 C18,16.595336 16.094306,18.500336 13.7422153,18.500336 Z" id="Stroke-3"></path>
                </g>
            </g>
        </svg>
        );
}
