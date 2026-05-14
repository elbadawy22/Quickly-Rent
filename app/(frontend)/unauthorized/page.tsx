// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-zinc-50 px-4">
      <div className="rounded-full bg-red-50 p-6 ring-1 ring-red-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600"
        >
          <path d="M2 21a8 8 0 0 1 11.873-7" />
          <circle cx="10" cy="8" r="5" />
          <path d="m17 17 5 5" />
          <path d="m22 17-5 5" />
        </svg>
      </div>
      <h1 className="text-center text-3xl font-bold tracking-tight text-zinc-900">Unauthorized</h1>
    </div>
  );
}
