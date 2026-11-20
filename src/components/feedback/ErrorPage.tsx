function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-screen bg-dark flex-col gap-2">
      <h1 className="md:text-4xl text-xl text-center   text-red-400 ">
        Something went wrong
      </h1>
      <div className="text-gray-400 text-lg">Try to reload page,</div>
      <div className="mt-4 dark:text-white">
        {error.message || "Unknown message"}
      </div>
    </div>
  );
}

export default ErrorPage;
