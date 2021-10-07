import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const component = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component,
      context: {
        name: pizza.name,
        slug: pizza.slug.current,
      },
    })
  );
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const component = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) =>
    actions.createPage({
      path: `topping/${topping.name}`,
      component,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    })
  );
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const component = path.resolve('./src/pages/slicemasters.js');
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.slicemasters.nodes.forEach((person) =>
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: person.name,
        slug: person.slug.current,
      },
    })
  );

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from({ length: pageCount }, (_, i) =>
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component,
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  );
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await res.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({ ...beer, ...nodeMeta });
  }
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};
