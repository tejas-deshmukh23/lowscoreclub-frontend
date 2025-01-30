export default function QuestionList() {
    const questions = [
      { id: 1, title: "How to use Next.js?", votes: 5, answers: 2 },
      { id: 2, title: "What is React Server Components?", votes: 8, answers: 4 }
    ];
    
    return (
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Top Questions</h2>
        {questions.map((q) => (
          <div key={q.id} className="p-2 border-b">
            <h3 className="text-blue-600 cursor-pointer">{q.title}</h3>
            <p>{q.votes} votes • {q.answers} answers</p>
          </div>
        ))}
      </div>
    );
  }