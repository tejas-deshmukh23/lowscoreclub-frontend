export default function Header() {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center max-w-6xl mx-auto px-16">
        <h1 className="text-xl font-bold">LowScore.club</h1>
        <input type="text" placeholder="Search..." className="border p-2 rounded w-1/3" />
      </header>
    );
  }