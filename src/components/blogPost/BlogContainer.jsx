import React, {useState, useEffect} from "react";
import {marked} from "marked";
import postsContext from "../../context/postsContext";
import postsApi from "../../postsApi";
import BlogPost from "./BlogPost";
import BlogPrompt from "./BlogPrompt";
import styles from "./blogContainer.module.css";

/**
 * BlogContainer component manages the state and interactions for displaying
 * and updating blog posts. It provides context to child components for managing posts,
 * including adding, updating, and deleting posts.
 *
 * @component
 * @example
 * return (
 *   <BlogContainer />
 * )
 *
 * BlogContainer -> BlogPost, BlogPrompt
 */
function BlogContainer() {
  const [displayedPost, setDisplayedPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(false);

  /**
   * Fetches a new post based on the provided form data and saves it.
   *
   * @param {Object} formData - The form data containing the prompt for the new post.
   */
  async function newPrompt(formData) {
    try {
      const newPrompt = formData.prompt;
      const resp = await postsApi.getPost(newPrompt);
      const answer = resp.response;
      savePrompt(answer);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  /**
   * Saves a new post by parsing the response and adding it to the list of posts.
   *
   * @param {Object} answer - The answer object containing the title and body of the post.
   */
  async function savePrompt(answer) {
    try {
      const {title, body} = answer;

      const cleanedTitle = title.replace(/^\*\*Title:\*\*\s*/i, "");
      const cleanedBody = body.replace(/^\*\*Body:\*\*\s*/i, "");

      const htmlTitle = marked.parse(cleanedTitle);
      const htmlText = marked.parse(cleanedBody);

      const resp = await postsApi.addPost({
        title: htmlTitle,
        text: htmlText,
      });
      const post = resp.post;

      setPosts((prevPosts) => [...prevPosts, post]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  }

  /**
   * Sets the displayed post based on the selected post ID.
   *
   * @param {string} id - The ID of the post to be displayed.
   */
  function showPost(id) {
    const clickedPost = posts.find((post) => String(post._id) === String(id));
    setDisplayedPost(clickedPost);
  }

  /**
   * Fetches all posts from the API and sets them in state.
   */
  async function getPosts() {
    const resp = await postsApi.getPosts();
    setPosts(resp.posts);
  }

  /**
   * Updates a specific post with the edited content and updates state.
   *
   * @param {string} id - The ID of the post to be updated.
   * @param {Object} editedPost - The updated post content.
   */
  async function updatePost(id, editedPost) {
    const resp = await postsApi.updatePost(id, editedPost);
    const updatedPost = resp.post;
    setUpdatedPost(true);
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        String(p._id) === String(updatedPost._id) ? {...p, ...updatedPost} : p
      )
    );
  }

  /**
   * Deletes the currently displayed post and updates the list of posts.
   */
  async function deletePost() {
    try {
      const postId = displayedPost._id;
      await postsApi.deletePost(postId);
      setPosts((prevPosts) =>
        prevPosts.filter((p) => String(p._id) !== String(postId))
      );
      if (posts.length === 0) {
        setDisplayedPost({});
      }
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts && posts.length > 0 && !updatedPost) {
      setDisplayedPost(posts[posts.length - 1]);
    }
  }, [posts]);

  return (
    <postsContext.Provider
      value={{
        posts,
        displayedPost,
        isLoading,
        updatedPost,
        newPrompt,
        showPost,
        setDisplayedPost,
        setIsLoading,
        savePrompt,
        updatePost,
        deletePost,
        setUpdatedPost,
      }}
    >
      <div className={styles.blogContainer}>
        <div className={styles.blogPost}>
          <BlogPrompt />
          <BlogPost />
        </div>
      </div>
    </postsContext.Provider>
  );
}

export default BlogContainer;
