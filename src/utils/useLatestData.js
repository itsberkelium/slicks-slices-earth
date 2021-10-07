import { useState, useEffect } from 'react';

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  const gql = String.raw;

  const deets = gql`
      name
      _id
      image {
        asset {
          url
          metadata {
            lqip
          }
        }
      }
  `;

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "earth") {
              name
              slicemaster {
                ${deets}
              }
              hotslices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setHotSlices(data.StoreSettings.hotslices);
        setSlicemasters(data.StoreSettings.slicemaster);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
