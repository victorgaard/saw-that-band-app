function Loading() {
  return (
    <div className="flex h-screen flex-col justify-between bg-zinc-850 p-4 sm:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="h-[128px] w-[128px] shrink-0 rounded-lg bg-zinc-600 object-cover shadow-2xl" />
          <div className="flex flex-col gap-2">
            <div className="h-[40px] w-[200px] rounded-lg bg-zinc-700" />
            <div className="h-[20px] w-[100px] rounded-lg bg-zinc-700" />
          </div>
        </div>
      </div>
      <div className="-mb-2 h-[52px] w-full rounded-lg bg-zinc-700" />
    </div>
  );
}

export default Loading;
