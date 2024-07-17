import React from "react";

export function EmptyMoviesList() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 my-20">
      <h2 className="text-4xl font-bold">Oops! No Movies Here...</h2>
      <p className=" text-lg">It looks like our movie magic ran out! 🪄✨</p>
      {/* Magic wand and sparkle emoji */}
    </div>
  );
}
