import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/SupabaseClient";

export default function Create() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState('');
  const [fromError, setFormError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!title || !desc || !rating) {
      setFormError("Please fill in all the fields !");
    }
    else {
      const { data, error } = await supabase
        .from("Features")
        .insert([{title, desc, rating}])
        .select();
      
      console.log(title, desc, rating);
      
      if(error) {
        setFormError("Faild to insert, Please try again !");
        console.log(error);
      }
      else {
        navigate('/');
      }
    }
  }

  return (
    <div className="bg-slate-300 lg:w-1/2 w-full p-5 rounded-xl mx-auto my-5">
      <h1 className="text-center font-semibold text-slate-700 text-lg">Insert a new Feature</h1>
      <hr className="w-2/3 mx-auto my-3" />

      {/* Form */}
      <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          className="outline-none border border-slate-400 rounded-lg p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text"
          placeholder="Description"
          className="outline-none border border-slate-400 rounded-lg p-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input 
          type="number"
          placeholder="Rating"
          className="outline-none border border-slate-400 rounded-lg p-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <div className="flex justify-center gap-10 mt-8">
          <button className="px-2 py-1 rounded-lg text-white bg-red-500 flex-1">Clear</button>
          <button className="px-2 py-1 rounded-lg text-white bg-sky-500 flex-1">Submit</button>
        </div>

        {/* Display Error */}
        {fromError && (
          <p className="text-center mt-5 bg-white p-2 rounded-lg border-t-8 border-red-500">{fromError}</p>
        )}
      </form>
    </div>
  )
}
