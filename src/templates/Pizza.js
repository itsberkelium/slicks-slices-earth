import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import React from 'react';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Pizza = ({ data: { pizza } }) => (
  <>
    <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
    <PizzaGrid>
      <GatsbyImage fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  </>
);

export default Pizza;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;