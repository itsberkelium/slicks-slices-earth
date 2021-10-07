import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const BeersPage = ({ data }) => {
  const { nodes: beers } = data.beers;
  return (
    <>
      <SEO title={`Beers! We have ${beers.length} in stock`} />
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in only!
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => (
          <SingleBeerStyles key={beer.id}>
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p title={`${3} our of 5 stars`}>
              {`⭐`.repeat(3)}
              <span style={{ filter: `grayscale(1)` }}>
                {`⭐`.repeat(5 - 3)}
              </span>
            </p>
          </SingleBeerStyles>
        ))}
      </BeerGridStyles>
    </>
  );
};

export default BeersPage;

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        id
        price
        image
      }
    }
  }
`;
