import { useState, useEffect } from "react";
import { supabase } from "../config/SupabaseClient";
import FeatureCard from "../components/FeatureCard";

export default function Home() {

  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');


  // Fetch Data 
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Features").select().order(orderBy, {ascending: false});

      if(error) {
        setFetchError("Could not fetch data !");
        setData(null);
        console.log(error);
      }
      else {
        setData(data);
        setFetchError(null);
      }
    }

    fetchData();
    
  }, [orderBy]);

  // Update Local State when deleting an item
  const handleDelete = (id) => {
    setData((previousData) => {
      return previousData.filter(data => data.id !== id)
    })
  }

  
  return (
    <div>
        {fetchError && <p className="bg-red-200 border border-red-300 text-red-700 rounded-lg p-3 text-center my-5">{fetchError}</p>}
        {data && (
          <div className="mt-10 overflow-x-auto">
            <div className="flex items-center justify-center gap-5 mb-5">
              <button onClick={() => setOrderBy("created_at")} className={`${orderBy === 'created_at' ? 'bg-sky-500 text-white' : 'bg-white'} px-2 py-1 rounded-lg text-slate-500`}>Creation Date</button>
              <button onClick={() => setOrderBy("rating")} className={`${orderBy === 'rating' ? 'bg-sky-500 text-white' : 'bg-white'} px-2 py-1 rounded-lg text-slate-500`}>Rating</button>
              <button onClick={() => setOrderBy("title")} className={`${orderBy === 'title' ? 'bg-sky-500 text-white' : 'bg-white'} px-2 py-1 rounded-lg text-slate-500`}>Title</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {
                data.map((item) => {
                  return (
                    <FeatureCard item={item} key={item.id} onDelete={handleDelete} />
                  );
                })
              }
            </div>
          </div>
        )}
    </div>
  )
}
