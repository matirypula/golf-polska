import { Search } from 'lucide-react';

export function SearchBox({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form className="flex items-center gap-3 rounded-3xl border bg-white p-3 shadow-lg">
      <Search className="ml-2 h-5 w-5 text-slate-500" />
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Szukaj: Warszawa, driving range, resort..."
        className="w-full bg-transparent px-2 py-3 outline-none"
      />
      <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
        Szukaj
      </button>
    </form>
  );
}
