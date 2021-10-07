import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {Array.from({ length: count || 4 }, (_, i) => (
      <ItemStyles key={i}>
        <p className="mark">Loading...</p>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          className="loading"
          alt="Loading"
          width="500"
          height="400"
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
