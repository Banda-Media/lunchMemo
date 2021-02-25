import { OneToManyRelationships } from '@typing/types';
import React from 'react';

export interface FoodItemsProps {
  foods: OneToManyRelationships | never[];
}

const FoodItems: React.FC<FoodItemsProps> = (foods) => {
  const getFoodItems = () => {
    const food = Object.keys(foods).map((foodItems) => foodItems);
    return food.length < 1 ? (
      <span>
        <span className="text-xl">No foods selected - here are some ideas:</span>
        <div className="text-md text-gray-500 pt-3"> Pizza, Vegan, Japanese, and Cuban</div>
      </span>
    ) : (
      food.map((foodItem) => foodItem)
    );
  };
  return <div className="pt-10">{getFoodItems()}</div>;
};

export default FoodItems;
