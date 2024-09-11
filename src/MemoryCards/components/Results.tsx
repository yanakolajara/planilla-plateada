import React from 'react';
import './Results.scss';

type Props = {
  timeResult: () => number;
  score: number;
  wrongMatches: number;
};

export default function Results({ timeResult, score, wrongMatches }: Props) {
  return (
    <div className='game-results'>
      <h1>Time Result: {timeResult().toFixed(1)} seconds</h1>
      <h1>Wrong Matches: {wrongMatches}</h1>
      <h1>Score: {score}</h1>
      <a href='/memory-cards'>Play Again</a>
    </div>
  );
}
