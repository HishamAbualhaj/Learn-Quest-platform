import React from "react";
import Ai from "../../assets/blog/artical.jpg";
import cloud from "../../assets/blog/cloud_computing.jpg";
import web from "../../assets/blog/web.jpg";
import cyber from "../../assets/blog/cyber.jpg";
import Button from "../Button";
import { Link } from "react-router-dom";
function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Evolution of Artificial Intelligence: Where Are We Now?",
      summary:
        "Artificial Intelligence (AI) has come a long way since its conceptual origins in the mid-20th century. From simple rule-based systems to advanced machine learning algorithms, AI has transformed industries and reshaped how we interact with technology. But where exactly are we now, and where are we heading?",
      image: Ai,
      author: "Hisham (ADMIN)",
    },
    {
      id: 2,
      title: "The Role of Cloud Computing in Modern IT Solutions",
      summary:
        "Discuss the growing adoption of cloud computing in IT infrastructure. Cover key benefits like scalability, cost savings, and flexibility. Compare popular cloud providers (AWS, Azure, Google Cloud) and their unique offerings. Explain trends such as hybrid cloud and serverless computing.",
      image: cloud,
      author: "Hisham (ADMIN)",
    },
    {
      id: 3,
      title: "The Future of Web Development: What's Next in 2024?",
      summary:
        "Examine trends shaping web development, such as the rise of progressive web apps (PWAs), advancements in frameworks like Next.js and React, and the integration of AI in web design. Include insights into the importance of Web3, blockchain technology, and enhanced user experiences through AR/VR.",
      image: web,
      author: "Hisham (ADMIN)",
    },
    {
      id: 4,
      title: "Cybersecurity Essentials for Businesses in 2024",
      summary:
        "Highlight the importance of robust cybersecurity for businesses, given the rise in ransomware and phishing attacks. Provide an overview of key practices like multi-factor authentication, regular updates, and employee training. Include insights into emerging threats like AI-driven attacks and the significance of zero-trust architecture.",
      image: cyber,
      author: "Hisham (ADMIN)",
    },
  ];
  return (
    <div className="sm:px-5 px-3 py-5">
      <div className="text-4xl">Blog</div>
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-3 mt-5">
        {posts.map((post) => (
          <div key={post.id} className=" border dark:border-borderDark">
            <div className="flex p-3 rounded-md gap-5 lg:flex-row flex-col">
              <img
                className="max-lg:mx-auto md:max-w-[400px] h-[400px] object-cover"
                src={post.image}
                alt="Ai image"
              />
              <div className="flex flex-col mt-5">
                <div className="font-bold text-2xl">{post.title}</div>
                <div className="leading-8 text-lg text-black/50 mt-5 dark:text-white/50 max-w-[700px] line-clamp-4">
                  {post.summary}
                </div>
                <div className="underline mt-5 text-purple-300">
                  Author : {post.author}
                </div>
                <Link to={post.title.replace(/\//g,"")}>
                  <Button margin="mt-4" text="Read Now" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
