import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            }
          }
        }`
      )
      .then((data) => setAllPosts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen p-12">
      <div className="container mx-auto">
        <h2 className="text-5xl flex justify-center">Blog Posts</h2>
        <h3 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my blog posts page!
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {allPosts?.map((post, index) => (
            <Link to={`/${post.slug.current}`} key={post.slug.current}>
              <span
                className="block bg-white h-64 relative rounded shadow leading-snug"
                key={index}
              >
                <img
                  className="w-full h-full rounded object-cover absolute"
                  src={post.mainImage.asset.url}
                  alt="main hero img"
                />
                <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                  <h2 className="text-white text-lg font-bold px-3 py-4 bg-gray-700 text-gray-100 bg-opacity-75 rounded">
                    {post.title}
                  </h2>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
