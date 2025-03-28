import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ✅ API URL Configuration
const BASE_URL = "http://localhost:3000";

// ✅ Component to Render Lexical Content Correctly
function RenderLexicalContent({ content }) {
    console.log(content, "lexicalContent");

    if (!Array.isArray(content)) {
        return <p className="text-gray-600">No content available</p>;
    }

    return content.map((node, index) => {

        const applyFormatting = (text, format) => {
            let classNames = "";

            if (format === 1 || format === 3 || format === 9 || format === 11) {
                classNames += " font-bold";
            }
            if (format === 2 || format === 3 || format === 10 || format === 11) {
                classNames += " italic";
            }
            if (format === 8 || format === 9 || format === 10 || format === 11) {
                classNames += " underline";
            }

            return <span className={classNames}>{text}</span>;
        };

        // Extract and format all text content from the children array
        const textContent = node.children?.map((child, i) => 
            applyFormatting(child.text || "", child.format)
        );

        if (node.type === "heading") {
            const headingStyles = {
                h1: "text-4xl font-bold mb-5 mt-10 text-gray-900",
                h2: "text-3xl font-semibold mb-5 mt-10 text-gray-900",
                h3: "text-2xl font-semibold mb-4 mt-10 text-gray-900",
                h4: "text-xl font-medium mb-3 mt-10 text-gray-900",
                h5: "text-lg font-medium mb-2 text-gray-900",
                h6: "text-base font-medium mb-1 text-gray-900",
            };

            const headingClass = headingStyles[node.tag] || headingStyles.h2;

            return (
                <node.tag key={index} className={headingClass}>
                    {textContent}
                </node.tag>
            );
        } 
        else if (node.type === "paragraph") {
            return (
                <p key={index} className="text-base text-gray-900 my-2 leading-relaxed">
                    {textContent}
                </p>
            );
        } 
        else if (node.type === "list") {
            const isCheckList = node.listType === "check";
            const listStyles = isCheckList ? "list-none my-2" : "list-disc list-inside my-2";
            return (
                <ul key={index} className={listStyles}>
                    {node.children.map((item, i) => (
                        <li key={i} className={`text-gray-700 text-base ${isCheckList && "flex items-center gap-2"}`}>
                            {isCheckList && <input type="checkbox" className="w-4 h-4 accent-blue-500" />}
                            {item.children.map((child) => applyFormatting(child.text || "", child.format))}
                        </li>
                    ))}
                </ul>
            );
        }
        else if (node.type === "quote") {
            return (
                <blockquote key={index} className="border-l-4 border-gray-400 pl-4 italic text-gray-700 bg-gray-100 p-3 rounded-md my-4">
                    {textContent}
                </blockquote>
            );
        }
        return null;
    });
}
  

// ✅ Function to Render Individual Lexical Nodes
const RenderNode = ({ node }) => {
  if (!node) return null;

  const { type, tag, text, children } = node;

  switch (type) {
    case "heading":
      const HeadingTag = tag || "h2";
      return <HeadingTag>{text}</HeadingTag>;

    case "paragraph":
      return <p>{text}</p>;

    case "list":
      return (
        <ul>
          {children?.map((item, idx) => (
            <li key={idx}>{item.text}</li>
          ))}
        </ul>
      );

    case "quote":
      return <blockquote className="border-l-4 pl-4 italic">{text}</blockquote>;

    case "code":
      return (
        <pre className="bg-gray-200 p-2 rounded">
          <code>{text}</code>
        </pre>
      );

    case "link":
      return (
        <a href={node.url} className="text-blue-500 underline">
          {text}
        </a>
      );

    default:
      return null;
  }
};

// ✅ Main BlogDetails Component
const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogsnew?where[slug]=${slug}`);
        const data = await res.json();

        if (data.docs?.length > 0) {
          setBlog(data.docs[0]);
          console.log("Blog Data:", data.docs[0]); // Debugging
          console.log("Lexical Content:", data.docs[0].content); // Debugging
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  console.log(blog, "blogggg")

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-8 py-4 flex flex-col items-start text-justify w-[90%] md:w-[70%]  mt-4">
      <h1 className="font-bold text-4xl text-center mt-5">{blog.title}</h1>

      {blog.thumbnail && (
        <img
          src={`${BASE_URL}${blog.thumbnail?.url}`}
          alt={blog.thumbnail?.alt || "Blog Thumbnail"}
          className="w-[90%] my-4 rounded"
        />
      )}

      {/* ✅ Render Content Properly */}
      <div className="font-poppins">
      <RenderLexicalContent content={blog.content.root.children} />
      </div>
    </div>
  );
};

export default BlogDetails;
