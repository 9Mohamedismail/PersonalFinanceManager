function TopBar() {
  return (
    <div className="flex items-center justify-between border border-primary text-secondary px-2 py-6 bg-white">
      <h1 className="text-4xl tracking-wide font-bold">Welcome Alan!</h1>
      <div className="flex items-center space-x-4">
        <p className="text-xl tracking-wide font-bold">Alan North</p>
        <img
          src="https://placehold.co/16x16"
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}

export default TopBar;
