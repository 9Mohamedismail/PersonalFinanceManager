function ErrorPage() {
  return (
    <div className="px-4 lg:px-8">
      <div className="h-screen flex flex-col max-w-lg mx-auto items-center justify-center">
        <p className="text-9xl text-center mb-4 text-primary tracking-wide">
          OOPS!
        </p>
        <p className="text-4xl text-center text-gray-900">
          404 - PAGE NOT FOUND
        </p>
        <p className="text-lg text-center text-gray-900 mb-2">
          The page you are looking for might have been removed, had it's name
          changed, or is temproarily unavailable
        </p>
        <button className="border-2 bg-white rounded shadow-sm border-primary py-2 w-full px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer">
          GO TO HOMEPAGE
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
