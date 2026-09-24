import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets/assets.js";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [published, setIsPublished] = useState(false);

  const generateContent = async () => {
    console.log("Generate with AI clicked");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const description = quillRef.current ? quillRef.current.root.innerHTML : "";

    console.log({
      image,
      title,
      subTitle,
      category,
      published,
      description,
    });
  };

  useEffect(() => {
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-auto"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Upload Thumbnail */}
        <p>Upload Thumbnail</p>

        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload thumbnail"
            className="mt-2 h-16 rounded cursor-pointer"
          />

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4">Blog Title</p>

        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-4">Sub Title</p>

        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subTitle}
        />

        {/* Blog Description */}
        <p className="mt-4">Blog Description</p>

        <div className="max-w-lg h-[300px] pb-16 sm:pb-10 pt-2 relative">
          {/* Quill Editor */}
          <div ref={editorRef}></div>

          {/* AI Button */}
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Category</p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        {/* Published */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setIsPublished(e.target.checked)}
          />

          <label>Publish this blog</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 bg-primary text-white px-6 py-2 rounded cursor-pointer"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
