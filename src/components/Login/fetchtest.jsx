import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchData = async () => {
  const response = await axios.get('https://3.34.197.56:443/api/test/get');
  return response.data;
};

const TestComponent = () => {
  const { data, isLoading, error } = useQuery('testData', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
