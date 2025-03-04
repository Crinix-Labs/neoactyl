import React, { useEffect } from 'react';

const ThemeController = () => {
  const themes = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'cupcake', label: 'Cutie' },
    { value: 'valentine', label: 'Valentine' },
    { value: 'aqua', label: 'Aqua' },
    { value: 'dim', label: 'Colorblind Dark' },
    { value: 'night', label: 'Dark Night' },
    { value: 'lemonade', label: 'Juicy' },
    { value: 'silk', label: 'Silk' },
    { value: 'caramellatte', label: 'Caramel' },
    { value: 'autumn', label: 'Cream' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('themes');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <>
      <div className="dropdown mb-72 fixed top-4 right-6 z-10">
        <div tabIndex={0} role="button" className="btn m-1   border-primary border-2">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul tabIndex={0} data-choose-theme className="fixed  right-1 dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
          {themes.map((theme) => (
            <li key={theme.value}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme.label}
                value={theme.value}
                onChange={(e) => {
                  localStorage.setItem('theme', e.target.value);
                  document.documentElement.setAttribute('data-theme', e.target.value);
                }}
              />
              
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ThemeController;