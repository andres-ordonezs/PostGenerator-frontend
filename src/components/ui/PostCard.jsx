import React from "react";
import {htmlToText} from "html-to-text";
import {format} from "date-fns";
import styles from "./PostCard.module.css";

/**
 * PostCard component displays a card for a blog post with its title and date.
 * It handles click events to select the post.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique ID of the post.
 * @param {function} props.onClick - Callback function to handle card click events.
 * @param {string} props.title - The HTML content of the post title.
 * @param {string} props.date - The date of the post in ISO format.
 * @param {string} [props.className] - Optional additional CSS class names to apply to the card.
 * @example
 * return (
 *   <PostCard
 *     id="1"
 *     onClick={handleClick}
 *     title="<b>Post Title</b>"
 *     date="2024-08-21T12:34:56Z"
 *     className="selected"
 *   />
 * )
 * BlogPrompt -> PostCard
 */
function PostCard({id, onClick, title, date, className}) {
  // Convert HTML to text
  const htmlTitle = htmlToText(title, {
    wordwrap: 100,
    uppercase: false,
  });

  // Format the date
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");

  /**
   * Handles click events on the card.
   *
   * @function
   */
  function handleClick() {
    onClick(id);
  }

  return (
    <div
      id={id}
      onClick={handleClick}
      className={`${styles.postCardContainer} ${styles.textTruncate}
      ${className === "selected" ? styles.selected : ""}`}
    >
      <div className={styles.textContent}>{htmlTitle}</div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
}

export default PostCard;
