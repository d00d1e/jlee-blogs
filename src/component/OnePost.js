import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "authorName": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-gray-200 min-h-screen p-12">
      <div className="container shadow-lg mx-auto bg-green-100 rounded-lg">
        <div className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            {/* Title Section */}
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h2 className="cursive text-3xl lg:text-6xl mb-4">
                {post.title}
              </h2>
              <div className="flex justify-center text-gray-800">
                <img
                  src={urlFor(post.authorImage).url()}
                  className="w-10 h-10 rounded-full"
                  alt="Author is Kap"
                />
                <h4 className="cursive flex items-center pl-2 text-1xl">
                  {post.authorName}
                </h4>
              </div>
            </div>
          </div>
          <img
            className="w-full object-cover rounded-t"
            src={urlFor(post.mainImage).url()}
            alt=""
            style={{ height: "400px" }}
          />
        </div>
        <div className="flex flex-start px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-l">
          <BlockContent
            blocks={post.body}
            projectId={sanityClient.config().projectId}
            dataset={sanityClient.config().dataset}
          />
        </div>
      </div>
    </div>
  );
}
