export default function Dock() {
  return (
    <div className="w-[40ch] h-[7ch] bg-black/10 rounded-2xl flex justify-around items-center backdrop-blur-lg">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-500 rounded-xl w-[5ch] h-[5ch]" />
      ))}
    </div>
  );
}