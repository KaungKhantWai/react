import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    paragraph: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);


  // Form input တွေ ရိုက်တဲ့အခါ data သိမ်းပေးမယ့် function
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

  // Image file ရွေးတဲ့အခါ သိမ်းပေးမယ့် function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
  data.append("title", formData.title);
  data.append("category", formData.category);
  data.append("author", formData.author);
  data.append("paragraph", formData.paragraph);
  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
    alert("Post uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert("Upload failed!");
  }
  };

  return (
    <main className="min-h-screen py-12 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to="/news" className="text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 inline-block">
          ← Back to News
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Post</h1>
          <p className="text-gray-500 mb-8">သင့်ရဲ့ သတင်းဆောင်းပါးသစ်ကို ဒီကနေ တင်နိုင်ပါတယ်။</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Post Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="သတင်းခေါင်းစဉ် ရေးပါ..."
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tag / Category</label>
                <input
                  type="text"
                  name="category"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Technology"
                  onChange={handleChange}
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
                <input
                  type="text"
                  name="author"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="ရေးသားသူအမည်"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input type="file" name="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="pl-1 text-gray-500">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  {preview && (
  <img
    src={preview}
    alt="preview"
    className="mt-4 w-full h-48 object-cover rounded-xl"
  /> )}
                </div>
              </div>
            </div>

            {/* Paragraph */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph / Content</label>
              <textarea
                name="paragraph"
                required
                rows="6"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="အကြောင်းအရာ အပြည့်အစုံ ရေးသားရန်..."
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
            >
              Publish Post
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}