import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogCard2 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/blogsnew"); // Update API URL if needed
        const data = await res.json();
        setBlogs(data.docs); // Payload CMS returns data inside `docs`
        console.log(data.docs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="block">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`http://localhost:3001${blog.thumbnail.url}`} // Adjust based on your media storage
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCard2;
