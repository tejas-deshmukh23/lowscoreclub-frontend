// app/components/VoteBookmark.jsx
'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Bookmark } from 'lucide-react';

const VoteBookmark = ({ initialVotes = 0, postId, onVoteChange }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleVote = async (voteType) => {
    try {
      let newVotes = votes;
      
      if (voteType === 'up') {
        if (userVote === 'up') {
          newVotes -= 1;
          setUserVote(null);
        } else {
          newVotes += (userVote === 'down' ? 2 : 1);
          setUserVote('up');
        }
      } else {
        if (userVote === 'down') {
          newVotes += 1;
          setUserVote(null);
        } else {
          newVotes -= (userVote === 'up' ? 2 : 1);
          setUserVote('down');
        }
      }

      setVotes(newVotes);
      onVoteChange?.(newVotes);

      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          voteType,
          previousVote: userVote,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save vote');
      }

    } catch (error) {
      console.error('Error voting:', error);
      // Revert the optimistic update on error
      setVotes(votes);
      setUserVote(userVote);
    }
  };

  const handleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);

      const response = await fetch('/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          bookmarked: !isBookmarked,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save bookmark');
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
      // Revert the optimistic update on error
      setIsBookmarked(isBookmarked);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => handleVote('up')}
        className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
          userVote === 'up' ? 'text-blue-500' : 'text-gray-500'
        }`}
        aria-label="Upvote"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <span className="text-base font-medium text-gray-700 select-none">
        {votes}
      </span>

      <button
        onClick={() => handleVote('down')}
        className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
          userVote === 'down' ? 'text-blue-500' : 'text-gray-500'
        }`}
        aria-label="Downvote"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      <button
        onClick={handleBookmark}
        className={`p-1 mt-2 rounded-full hover:bg-gray-100 transition-colors ${
          isBookmarked ? 'text-blue-500' : 'text-gray-500'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <Bookmark 
          className="w-5 h-5"
          fill={isBookmarked ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
};

export default VoteBookmark;