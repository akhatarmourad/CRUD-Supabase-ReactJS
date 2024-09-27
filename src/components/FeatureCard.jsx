import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { supabase } from "../config/SupabaseClient";
import { useState } from "react";

export default function FeatureCard({ item }) {
  
  const {id, title, desc, rating} = item;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Features")
      .delete()
      .eq('id', id)
      .select();
    
    if(error) setError('Failed to delete record !');
    else navigate('/');
  }

  return (
    <div onClick={() => navigate(`/${id}`)} className="bg-opacity-50 bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-gray-500 text-sm mb-3">{desc.slice(0, 50)}...</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">{rating} Stars</span>
          <div className="flex items-center gap-2">
            <Link to={`/${id}`}>
              <AiFillEdit className="text-slate-500 transition-all duration-300 hover:scale-105 hover:text-sky-500" />
            </Link>
            <MdDelete 
              className="text-slate-500 transition-all duration-300 hover:scale-105 hover:text-red-500"
              onClick={() => handleDelete}
            />
          </div>
        </div>
    </div>
  )
}
