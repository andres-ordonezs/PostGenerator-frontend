import React from "react";
import styles from "./Card.module.css";

/**
 * Card component is a container that provides a styled wrapper for its children.
 * It applies styling to create a card-like appearance.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @example
 * return (
 *   <Card>
 *     <h2>Card Title</h2>
 *     <p>Card content goes here.</p>
 *   </Card>
 * )
 */
function Card({children}) {
  return (
    <div className={styles.card}>
      <div className={styles["card-inner"]}>{children}</div>
    </div>
  );
}

export default Card;
