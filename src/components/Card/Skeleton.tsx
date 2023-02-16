/** @format */

import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-card"
    speed={2}
    width={280}
    height={442}
    viewBox="0 0 280 442"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="305" rx="10" ry="10" width="280" height="80" />
    <rect x="170" y="402" rx="25" ry="25" width="110" height="45" />
    <rect x="0" y="402" rx="10" ry="10" width="110" height="35" />
  </ContentLoader>
);
