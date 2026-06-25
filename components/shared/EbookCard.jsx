import Link from "next/link";

export default function EbookCard({ ebook }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <img
        src={ebook.coverImage || "https://placehold.co/400x500?text=Fable"}
        alt={ebook.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold">{ebook.title}</h3>
          {ebook.status === "sold" && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
              Sold
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-slate-600">By {ebook.writerName}</p>
        <p className="mt-2 font-semibold">${ebook.price}</p>
        <p className="text-sm text-slate-500">{ebook.genre}</p>

        <Link
          href={`/ebook/${ebook._id || ebook.id}`}
          className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}