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
          const sortedPosts = data.posts.sort((a, b) => b.points - a.points);
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

  const updatePoints = async (postId, delta) => {
    try {
      const response = await fetch('/api/updatePoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, delta }),
      });

      const data = await response.json();
      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, points: post.points + delta } : post
          ).sort((a, b) => b.points - a.points) // Re-sort posts after updating points
        );
      } else {
        console.error('Error updating points');
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setShowPostFeed(false)}>
      <div className="max-h-screen w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-y-auto p-2 py-16 relative" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-800 p-4 z-10">
          <button
            onClick={() => setShowPostFeed(false)}
            className="px- py-4 bg-red-400 text-black rounded shadow-lg hover:bg-red-600 transition-all w-full"
          >
            Close
          </button>
        </div>
        <div className="text-center text-gray-400 text-sm mb-4 mt-2">
          Click on the image to toggle original and AI
        </div>
        <div className="space-y-6 p-4">
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
                  style={{ width: '100%', height: 'auto', maxWidth: '1024px', maxHeight: '1024px' }} // Adjust to match AI image size
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-white font-semibold text-lg">Points: {post.points}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updatePoints(post._id, 1)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                  >
                    Upvote
                  </button>
                  <button
                    onClick={() => updatePoints(post._id, -1)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  >
                    Downvote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
