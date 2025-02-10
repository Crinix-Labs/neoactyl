import React from 'react';

const LoginButton = () => {
  return (
    <a
      href="http://s7l.project.crinix.us.kg:3000/api/auth/discord"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Login with Discord
    </a>
  );
};

export default LoginButton;
