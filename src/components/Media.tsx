import type { FC } from "react";
import type { Item } from "../types/nasa-api";

const Media: FC<{ item: Item }> = ({ item }) => {
  const { href, data, links } = item;
  const itemData = data[0] || {};
  const { title, description, date_created } = itemData;
  console.log("Media item data:", item);
  return (
    <div className="item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Date Created: {date_created}</p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        View Item
      </a>
      {links &&
        links.map((link, index) => (
          <div key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.rel}
            </a>
          </div>
        ))}
    </div>
  );
};

export default Media;
