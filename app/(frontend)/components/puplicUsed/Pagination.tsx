import Link from "next/link";

export default function Pagination({count,page,countPagn}:{count: number ,page: number,countPagn:number}) {

  return (
    <div className="flex flex-col items-center justify-between gap-2 border-t border-zinc-200 bg-white px-4 py-4 sm:flex-row sm:px-6">
      <p className="text-sm text-zinc-500">
        {/* Showing {filteredUsers.length} of  orders.length orders */}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {Array.from({ length: Math.ceil(count / countPagn) })?.map((_, i) => (
          <Link href={`?pageNumber=${i+1}`} key={i}>
            {i + 1 <= page + 1 && i + 1 >= page - 1 ? (
              <button
                value={i + 1}
                className={`mx-0.5 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition ${page == i + 1 ? "bg-zinc-900 text-white shadow-sm" : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"}`}
              >
                {i + 1}
              </button>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
