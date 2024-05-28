import React, { useState, useEffect } from 'react';

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [showGeneratedImages, setShowGeneratedImages] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
          const initialShowGeneratedImages = data.posts.reduce((acc, post) => {
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
    <div className="max-h-96 overflow-y-auto p-4 bg-gray-900 rounded-lg shadow-inner">
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div className={`border-4 p-2 rounded-lg ${showGeneratedImages[post._id] ? 'border-dashed border-blue-500' : 'border-solid border-green-500'}`}>
              <img
                src={showGeneratedImages[post._id] ? post.generatedImageUrl : post.imageUrl}
                alt={showGeneratedImages[post._id] ? 'Generated' : 'Original'}
                className="mt-2 mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => toggleImage(post._id)}
                className={`w-full px-6 py-3 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:via-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105 text-2xl font-extrabold text-center border-4 border-green-500 overflow-hidden`}
              >
                <div className="relative whitespace-nowrap">
                  {showGeneratedImages[post._id] ? 'Show Original' : 'Show AI'}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;