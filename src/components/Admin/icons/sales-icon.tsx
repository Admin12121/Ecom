import React, { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export const SalesIcon = () => {
    const { resolvedTheme } = useNextTheme();
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      if (resolvedTheme !== undefined) {
        setChecked(resolvedTheme === 'dark');
      }
    }, [resolvedTheme]);
    return(
        <svg width="45px"  height="45px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Iconly/Light/Document" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Document" transform="translate(3.000000, 2.000000)" className={`${checked ? "stroke-white" : "stroke-default-900"}`} strokeWidth="1.5">
                    <line x1="12.7162" y1="14.2234" x2="5.4962" y2="14.2234" id="Stroke-1"></line>
                    <line x1="12.7162" y1="10.0369" x2="5.4962" y2="10.0369" id="Stroke-2"></line>
                    <line x1="8.2513" y1="5.8601" x2="5.4963" y2="5.8601" id="Stroke-3"></line>
                    <path d="M12.9086,0.7498 C12.9086,0.7498 5.2316,0.7538 5.2196,0.7538 C2.4596,0.7708 0.7506,2.5868 0.7506,5.3568 L0.7506,14.5528 C0.7506,17.3368 2.4726,19.1598 5.2566,19.1598 C5.2566,19.1598 12.9326,19.1568 12.9456,19.1568 C15.7056,19.1398 17.4156,17.3228 17.4156,14.5528 L17.4156,5.3568 C17.4156,2.5728 15.6926,0.7498 12.9086,0.7498 Z" id="Stroke-4"></path>
                </g>
            </g>
        </svg>
        );
}
