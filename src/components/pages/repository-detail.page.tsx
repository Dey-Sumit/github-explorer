import React from 'react';
import { useParams } from 'react-router-dom';

const RepositoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log('RepositoryDetail', id);

  return <div>RepositoryDetail</div>;
};

export default RepositoryDetail;
