import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Charities() {
  // basic use of react-query
  const {
    error,
    isLoading,
    data: charities,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch('http://localhost:3000/charities').then((res) => res.json()),
  });

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h2>Charities</h2>
      {charities.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </div>
  );
}

export default Charities;
