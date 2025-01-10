export default function Dock() {
  return (
    <div className="w-[40ch] h-[7ch] bg-gray-800 rounded-2xl flex justify-around items-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-500 rounded-xl w-[5ch] h-[5ch]" />
      ))}
    </div>
  );
}