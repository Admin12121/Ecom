import React, { useEffect, useState } from 'react';
import './style.css';
import { useTheme as useNextTheme } from 'next-themes';

const ToggleButton = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (resolvedTheme !== undefined) {
      setChecked(resolvedTheme === 'dark');
    }
  }, [resolvedTheme]);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    setTheme(newChecked ? 'dark' : 'light');
  };

  return (
    <div className="toggle-button-cover ">
      <div className={`button bg-default-100 r ${checked ? 'dark' : 'light'}`} id="button-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default ToggleButton;
