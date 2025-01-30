export default function Sidebar() {
    const tags = ["Next.js", "React", "JavaScript", "CSS"];
    
    return (
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
          ))}
        </div>
      </div>
    );
  }