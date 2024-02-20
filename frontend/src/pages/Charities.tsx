import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Charity {
  id: number;
  name: string;
}

function Charities() {
  // basic use of react-query
  const {
    error,
    isLoading,
    data: charities,
  } = useQuery<Charity[]>({
    queryKey: ['repoData'],
    queryFn: () => fetch('http://localhost:3000/charities').then((res) => res.json()),
  });

  return (
    <div>
      <h2>Charities</h2>
      {isLoading && <p>Loading...</p>}
      {error && (
      <p>
        An error has occurred:
        {error.message}
      </p>
      )}
      {!isLoading && !error && charities && (
        <ul>
          {charities.map((c: Charity) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Charities;
