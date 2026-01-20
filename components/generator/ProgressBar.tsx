export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-slate-800 rounded-xl h-2 overflow-hidden">
      <div
        className="bg-indigo-500 h-2 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
