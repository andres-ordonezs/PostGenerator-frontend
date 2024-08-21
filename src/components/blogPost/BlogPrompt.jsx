import React, {useContext, useState, useEffect} from "react";
import postsContext from "../../context/postsContext";
import Card from "../ui/Card";
import PostCard from "../ui/PostCard";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Blog.module.css";

const initialformData = {prompt: ""};

/**
 * BlogPrompt component handles the creation of new blog prompts and displays a list of existing posts.
 * It provides a form for users to submit new prompts and displays a list of other blog posts.
 *
 * @component
 * @example
 * return (
 *   <BlogPrompt />
 * )
 * BlogContainer -> BlogPrompt
 */
function BlogPrompt() {
  const [formData, setFormData] = useState(initialformData);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const {
    posts,
    updatedPost,
    newPrompt,
    showPost,
    setIsLoading,
    setUpdatedPost,
  } = useContext(postsContext);

  /**
   * Handles the form submission to generate a new blog post based on the prompt.
   *
   * @param {Object} evt - The event object from the form submission.
   */
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    newPrompt(formData);
    setFormData(initialformData);
  }

  /**
   * Updates the form data when the input changes.
   *
   * @param {Object} evt - The event object from the input change.
   */
  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  }

  /**
   * Displays the selected post by updating the selected post ID and showing the post details.
   *
   * @param {string} id - The ID of the post to be displayed.
   */
  function displayPost(id) {
    setSelectedPostId(id);
    showPost(id);
  }

  useEffect(() => {
    if (posts && posts.length > 0 && !updatedPost) {
      setSelectedPostId(posts[posts.length - 1]._id);
    } else if (updatedPost) {
      setUpdatedPost(false);
    }
  }, [posts, updatedPost, setUpdatedPost]);

  return (
    <div className={`${styles.cardContainer} ${styles.blogPrompt}`}>
      <Card>
        <div className={styles.promptContainer}>
          <h3>Blog Posts</h3>
          <form onSubmit={handleSubmit}>
            <div className={`form-group ${styles.formGroup}`}>
              <label htmlFor="prompt" className={`form-label ${styles.label}`}>
                What would you like to write about?
              </label>
              <textarea
                type="text"
                name="prompt"
                className={`form-control ${styles.promptInput}`}
                id="prompt"
                aria-describedby="prompt"
                placeholder="Blog Post Prompt"
                value={formData.prompt}
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={`btn btn-primary ${styles.button}`}
              >
                Generate Post
              </button>
            </div>
          </form>
          <hr className={styles.horizontalLine} />
          <div className={styles.otherPostsContainer}>
            <h5>Other Posts</h5>
            {posts.length === 0 ? (
              <div className={styles.message}>No posts yet</div>
            ) : (
              posts !== undefined &&
              posts
                .slice()
                .reverse()
                .map((post) => (
                  <PostCard
                    title={post.title}
                    date={post.createdAt}
                    key={post._id}
                    id={post._id}
                    onClick={displayPost}
                    className={`${
                      String(post._id) === String(selectedPostId)
                        ? "selected"
                        : ""
                    }`}
                  >
                    {post.text !== undefined ? <div></div> : ""}
                  </PostCard>
                ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BlogPrompt;
