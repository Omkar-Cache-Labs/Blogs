import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";

// ✅ Import Required Lexical Nodes
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

const BlogDetails2 = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blogsnew?where[slug]=${slug}`);
        const data = await res.json();
        if (data.docs.length > 0) {
          setBlog(data.docs[0]); // Extract the first matching blog
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  // ✅ Ensure content is in the correct Lexical format
  const editorState = blog.content ? JSON.stringify(blog.content) : "{}";

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">{blog.title}</h1>
      <img
        src={`http://localhost:3000/${blog.thumbnail.url}`}
        alt={blog.thumbnail.alt}
        className="w-[60%] h-[25%] my-4 rounded"
      />

        <div className="w-[75%] mt-10">
      {/* ✅ Lexical Editor Configuration with Nodes */}
      <LexicalComposer
        initialConfig={{
          namespace: "BlogEditor",
          theme: {},
          editable: false, // Prevent user edits
          editorState, // ✅ Use parsed Lexical JSON state
          nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, CodeNode], // ✅ Register nodes
          onError: (error) => console.error("Lexical error:", error),
        }}
      >
        <RichTextPlugin
          contentEditable={<ContentEditable className="border p-2 bg-gray-100" />}
          placeholder={<p>Loading content...</p>}
        />
        <HistoryPlugin />
        <PlainTextPlugin />
      </LexicalComposer>
      </div>
    </div>
  );
};

export default BlogDetails2;
