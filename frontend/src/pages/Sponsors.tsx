import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Sponsor {
  id: number;
  name: string;
}

function Sponsors() {
  // basic use of react-query
  const {
    error,
    isLoading,
    data: sponsors,
  } = useQuery<Sponsor[]>({
    queryKey: ['repoData'],
    queryFn: () => fetch('http://localhost:3000/charities').then((res) => res.json()),
  });

  return (
    <div>
      <h2>Sponsors</h2>
      {isLoading && <p>Loading...</p>}
      {error && (
      <p>
        An error has occurred:
        {error.message}
      </p>
      )}
      {!isLoading && !error && sponsors && (
        <ul>
          {sponsors.map((s: Sponsor) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sponsors;
