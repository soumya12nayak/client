import { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }


    }


    useEffect(() => {
        // Initiate Qill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

      // Initialize Quill after component renders
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write the job description here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
      });
    }
  }, []);

    return (
        <form
  onSubmit={onSubmitHandler}
  className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-gray-100 shadow-2xl rounded-2xl max-w-4xl border border-gray-200"
>
  {/* Header */}
  <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">
    🚀 Add a New Job Listing
  </h2>

  {/* Job Title */}
  <div className="mb-5">
    <label className="block text-lg font-semibold text-gray-700 mb-2">
      Job Title
    </label>
    <input
      type="text"
      placeholder="e.g., Frontend Developer"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      required
      className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-500/50 transition-all"
    />
  </div>

  {/* Job Description */}
  <div className="mb-5">
  <label className="block text-lg font-semibold text-gray-700 mb-2">
    Job Description
  </label>
  <div
    ref={editorRef}
    className="border border-gray-300 p-3 rounded-lg shadow-sm min-h-[200px] bg-white focus:ring-4 focus:ring-blue-500/50 transition-all cursor-text"
  ></div>
</div>


  {/* Job Details */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

    {/* Category */}
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Category
      </label>
      <select
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-500/50 transition-all"
        onChange={(e) => setCategory(e.target.value)}
      >
        {JobCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Location */}
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Location
      </label>
      <select
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-500/50 transition-all"
        onChange={(e) => setLocation(e.target.value)}
      >
        {JobLocations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>

    {/* Level */}
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Experience Level
      </label>
      <select
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-500/50 transition-all"
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="Beginner level">Beginner</option>
        <option value="Intermediate level">Intermediate</option>
        <option value="Senior level">Senior</option>
      </select>
    </div>
  </div>

  {/* Salary */}
  <div className="mb-6">
    <label className="block text-lg font-semibold text-gray-700 mb-2">
      Salary (₹)
    </label>
    <input
      type="Number"
      placeholder="e.g., 50000"
      min={0}
      onChange={(e) => setSalary(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-500/50 transition-all"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
  >
    🚀 Post Job
  </button>
</form>

    )
}

export default AddJob