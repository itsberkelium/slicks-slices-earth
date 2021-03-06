import GatsbyImage from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
  const a = '';
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((p) => p.id === singleOrder.id);
        return (
          <MenuItemStyles key={index}>
            <GatsbyImage fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            </p>
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </MenuItemStyles>
        );
      })}
    </>
  );
};

export default PizzaOrder;
