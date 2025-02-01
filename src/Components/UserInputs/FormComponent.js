import { useState } from 'react';

export default function FormComponent() {
  // Form state management
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigned, setAssigned] = useState('');
  const [label, setLabel] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data (e.g., send to an API or log to console)
    console.log({ title, description, assigned, label, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="l">
      <div className="agc aoc bhh bhj bhm bry brz bsc">
        <label htmlFor="title" className="i">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          className="ky vo aty avf ayo azp baw bqb cag"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="i">Description</label>
        <textarea
          id="description"
          name="description"
          rows="2"
          placeholder="Write a description..."
          className="ky vo zu aty auk ayn baw bqb cag dai"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div aria-hidden="true">
          {/* Some empty divs, you might want to remove or refactor them later */}
        </div>
      </div>

      <div className="j ac cc">
        <div className="la aau abg adr atw aul cwv">
          <label className="i" htmlFor="assign">Assign</label>
          <button
            type="button"
            className="l lg aaz agb akr atw aul ayp azp azx bas bsz cwv"
            onClick={() => setAssigned('Assigned')}
          >
            <span className="ld afd con coy">Assign</span>
          </button>
        </div>

        <div className="ww">
          <label className="i" htmlFor="label">Add a label</label>
          <button
            type="button"
            className="l lg aaz agb akr atw aul ayp azp azx bas bsz cwv"
            onClick={() => setLabel('Label')}
          >
            <span className="ld afd con coy">Label</span>
          </button>
        </div>

        <div className="ww">
          <label className="i" htmlFor="dueDate">Add a due date</label>
          <button
            type="button"
            className="l lg aaz agb akr atw aul ayp azp azx bas bsz cwv"
            onClick={() => setDueDate('Due Date')}
          >
            <span className="ld afd con coy">Due date</span>
          </button>
        </div>
      </div>

      <div className="la aaz abe adt ahn aic atw aul cwv">
        <button
          type="button"
          className="bjm gc jr lg aaz agb aty aul ayc bar"
          onClick={() => alert('Attach a file functionality not implemented')}
        >
          <span className="ayp bas bdv bkx">Attach a file</span>
        </button>
        
        <div className="ww">
          <button type="submit" className="lg aaz agd amg aty aul ayp azr bdk bff bto car cat cba">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
