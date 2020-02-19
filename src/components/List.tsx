import * as React from "react";
import "./List.css";

export type ListProps<T> = {
  items: T[];
};

export function List({items}: ListProps<T>): JSX.Element {
  
  function renderItem(item<T>, index: number) {
    return <div />
  }

  return (
    <div className="list">
      {items.map(function (item, i) {
        return renderItem(item, i)
      })}
    </div>
  );
}