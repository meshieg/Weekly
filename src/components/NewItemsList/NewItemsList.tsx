import React from "react";
import NewItemRow from "../NewItemRow/NewItemRow";

interface INewItemsLisProps {
  items: ITask[] | IEvent[];
  removeItem: (id: number) => void;
}

const NewItemsList: React.FC<INewItemsLisProps> = ({ items, removeItem }) => {
  const onRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <>
      {items.map((item: ITask | IEvent) => (
        <NewItemRow key={item.id} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </>
  );
};

export default NewItemsList;
