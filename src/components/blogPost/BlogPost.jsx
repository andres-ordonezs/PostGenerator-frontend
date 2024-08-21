import React, {useState, useRef, useEffect, useContext} from "react";
import postsContext from "../../context/postsContext";
import Card from "../ui/Card";
import Loader from "../ui/Loader";
import styles from "./Blog.module.css";

const initialFormData = {id: 1, title: "", text: ""};

/**
 * BlogPost component displays and allows editing of a blog post.
 * It includes functionalities for editing, saving, copying, and deleting the post.
 *
 * @component
 * @example
 * return (
 *   <BlogPost />
 * )
 *
 * BlogContainer -> BlogPost
 */
function BlogPost() {
  const [formData, setFormData] = useState(initialFormData);
  const [editable, setEditable] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const contentRef = useRef();

  const {posts, isLoading, displayedPost, updatePost, deletePost} =
    useContext(postsContext);

  /**
   * Sets the form data and original content when the posts or displayedPost change.
   */
  useEffect(() => {
    if (posts.length > 0) {
      setFormData(displayedPost);
      setOriginalContent(displayedPost.text);
    } else {
      setFormData(initialFormData);
      setOriginalContent("");
    }
  }, [displayedPost, posts]);

  /**
   * Toggles the editable state for the content area.
   */
  function handleEdit() {
    setEditable(!editable);
  }

  /**
   * Resets the form data and content area when deleting a post.
   */
  function handleDelete() {
    setFormData(initialFormData);
    if (contentRef.current) {
      contentRef.current.innerHTML = initialFormData.text;
    }
  }

  /**
   * Copies the content of the post, including styling, to the clipboard.
   */
  function handleCopy() {
    const htmlContent = contentRef.current.innerHTML;

    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/html": new Blob([htmlContent], {type: "text/html"}),
        }),
      ])
      .then(() => {
        alert("Content with styling copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  /**
   * Applies the specified style (HTML tags) to the selected text within the content area.
   *
   * @param {string} startTag - The HTML tag to start the styling.
   * @param {string} endTag - The HTML tag to end the styling.
   */
  function applyStyle(startTag, endTag) {
    const contentDiv = contentRef.current;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (selectedText) {
      const fragment = document.createDocumentFragment();
      const wrapper = document.createElement("span");
      wrapper.innerHTML = `${startTag}${selectedText}${endTag}`;
      fragment.appendChild(wrapper);
      range.deleteContents();
      range.insertNode(fragment);
    }
  }

  /**
   * Updates the post with the current content from the content area.
   *
   * @param {Object} evt - The form submit event.
   */
  function handleUpdate(evt) {
    evt.preventDefault();
    const currentContent = contentRef.current.innerHTML;
    updatePost(displayedPost._id, currentContent);
    alert("Post saved");
  }

  /**
   * Deletes the current post.
   */
  function handleDelete() {
    deletePost();
  }

  /**
   * Updates the original content when the displayedPost changes.
   */
  useEffect(() => {
    setOriginalContent(displayedPost.text);
  }, [displayedPost]);

  return (
    <div className={`${styles.cardContainer} ${styles.blogPost}`}>
      <Card>
        <form className={styles.formContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2
                className={styles.postTitle}
                dangerouslySetInnerHTML={{__html: formData.title}}
              />

              <div
                ref={contentRef}
                className={`${styles.postContainer} ${
                  editable ? styles.editableDiv : ""
                }`}
                contentEditable={editable}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{__html: formData.text}}
              />
            </>
          )}

          {posts && posts.length > 0 && (
            <div
              className={`${styles.toolbarContainer} ${
                editable ? styles.toolbarContainerEditable : ""
              }`}
            >
              {!isLoading && editable && (
                <div className={styles.toolbarEdit}>
                  <button
                    type="button"
                    onClick={() => applyStyle("<b>", "</b>")}
                  >
                    <i className="fas fa-bold"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyStyle("<i>", "</i>")}
                  >
                    <i className="fas fa-italic"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyStyle("<u>", "</u>")}
                  >
                    <i className="fas fa-underline"></i>
                  </button>
                </div>
              )}

              {!isLoading && (
                <div className={styles.toolbarOptions}>
                  <div className={styles.tooltip}>
                    <button type="button" onClick={handleEdit}>
                      <i
                        className={`fas fa-edit ${
                          editable ? styles.editable : ""
                        }`}
                      ></i>
                    </button>
                    <span className={styles.tooltiptext}>Edit</span>
                  </div>

                  <div className={styles.tooltip}>
                    <button type="button" onClick={handleUpdate}>
                      <i className="fas fa-save "></i>
                    </button>
                    <span className={styles.tooltiptext}>Save</span>
                  </div>

                  <div className={styles.tooltip}>
                    <button type="button" onClick={handleCopy}>
                      <i className="fas fa-copy "></i>
                    </button>
                    <span className={styles.tooltiptext}>Copy</span>
                  </div>

                  <div className={styles.tooltip}>
                    <button type="button" onClick={handleDelete} title="Delete">
                      <i className="fas fa-trash "></i>
                    </button>
                    <span className={styles.tooltiptext}>Delete</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}

export default BlogPost;
