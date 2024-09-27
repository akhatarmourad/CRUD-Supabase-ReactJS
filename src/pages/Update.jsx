import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/SupabaseClient";

export default function Update() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);
  const [ID, setID] = useState(null);
  const [created_at, setCreated_at] = useState(null);

  useEffect(() => {
    const fetchSingleItem = async () => {
      const { data, error } = await supabase
        .from("Features")
        .select()
        .eq('id', id)
        .single();
      
      if(error) {
        navigate('/', {replace: 'true'});
      }
      else {
        setTitle(data.title);
        setDesc(data.desc);
        setRating(data.rating);
        setID(data.id);
        setCreated_at(data.created_at);
      }
    }

    fetchSingleItem();

  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !desc || !rating) {
      setError('Please fill all fields !');
    }
    else {
      const { data, error } = await supabase
        .from('Features')
        .update({title, desc, rating})
        .eq('id', id)
        .select();

      if(error) setError('Faild to update record, please try again !');
      else {
        setError(null);
        navigate('/');
      }
    }
  }

  return (
    <div className="bg-white w-full md:w-1/2 mx-auto my-5 rounded-xl p-5 text-gray-500">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input 
          className="bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none opacity-50"
          value={ID}
          readOnly={true}
        />
        <input
          className="bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none opacity-50"
          value={created_at}
          readOnly={true}
        />
        <input 
          type="text"
          placeholder="Title"
          className="bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          className="bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <div className="flex gap-5 mt-5">
          <Link to='/' className="text-center flex-1 px-2 py-1 rounded-md bg-yellow-500 text-white">Cancel</Link>
          <button className="flex-1 px-2 py-1 rounded-md bg-green-500 text-white">Save</button>
        </div>  
      </form>
    </div>
  )
}
