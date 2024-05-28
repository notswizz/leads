import React, { useState, useEffect } from 'react';

const PostDisplay = ({ setShowPostFeed }) => {
  const [posts, setPosts] = useState([]);
  const [showGeneratedImages, setShowGeneratedImages] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (data.success) {
          const sortedPosts = data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
          const initialShowGeneratedImages = sortedPosts.reduce((acc, post) => {
            acc[post._id] = true; // Show AI image by default
            return acc;
          }, {});
          setShowGeneratedImages(initialShowGeneratedImages);
        } else {
          console.error('Error fetching posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleImage = (postId) => {
    setShowGeneratedImages((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setShowPostFeed(false)}>
      <div className="max-h-96 w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-y-auto p-2" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
              <div
                className={`border-4 p-2 rounded-lg ${showGeneratedImages[post._id] ? 'border-dashed border-blue-500' : 'border-solid border-green-500'}`}
                onClick={() => toggleImage(post._id)}
              >
                <img
                  src={showGeneratedImages[post._id] ? post.generatedImageUrl : post.imageUrl}
                  alt={showGeneratedImages[post._id] ? 'Generated' : 'Original'}
                  className="mt-2 mx-auto rounded-lg shadow-lg cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
