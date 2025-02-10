

const LoginButton = () => {
  return (
    <a
      href="/api/auth/discord"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition m-10 text-[18px]"
    >
      Login with Discord
    </a>
  );
};

export default LoginButton;
