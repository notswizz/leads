import React, { useState, useEffect } from 'react';
import Sticky from './Sticky';

const PostDisplay = ({ setShowPostFeed }) => {
  const [posts, setPosts] = useState([]);
  const [showGeneratedImages, setShowGeneratedImages] = useState({});
  const [votedPosts, setVotedPosts] = useState({});
  const [sortOption, setSortOption] = useState('new');
  const [filterOption, setFilterOption] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/getPosts?sort=${sortOption}&filter=${filterOption}`);
      const data = await response.json();
      if (data.success) {
        const sortedPosts = data.posts;
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

  useEffect(() => {
    fetchPosts();
  }, [sortOption, filterOption]);

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
          ).sort((a, b) => sortOption === 'points' ? b.points - a.points : new Date(b.createdAt) - new Date(a.createdAt))
        );
        setVotedPosts((prev) => ({ ...prev, [postId]: true }));
      } else {
        console.error('Error updating points');
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleFilterChange = (value) => {
    setFilterOption(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setShowPostFeed(false)}>
      <div className="max-h-screen w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <Sticky onClose={() => setShowPostFeed(false)} onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
        <div className="text-center text-gray-400 text-sm mb-4 mt-8">
          Click on the image to toggle original and AI
        </div>
        <div className="space-y-6 p-4">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400">No posts found for the selected filter.</div>
          ) : (
            posts.map((post) => (
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
                      className={`px-2 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center ${votedPosts[post._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ width: '40px', height: '40px' }}
                      disabled={votedPosts[post._id]}
                    >
                      👍
                    </button>
                    <button
                      onClick={() => updatePoints(post._id, -1)}
                      className={`px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all flex items-center justify-center ${votedPosts[post._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ width: '40px', height: '40px' }}
                      disabled={votedPosts[post._id]}
                    >
                      👎
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
