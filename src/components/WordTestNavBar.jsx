function WordTestNavBar() {
  return (
    <div className="flex justify-around items-center p-4 bg-grey rounded-full shadow-lg">
      <a href="/" className="text-gray-400">Home</a>
      <a href="/write" className="text-blue-500 font-bold">Write</a>
      <a href="/profile" className="text-gray-400">Profile</a>
    </div>
  );
}

export default WordTestNavBar;
