import { useState, useEffect } from "react";
import { supabase } from "../config/SupabaseClient";
import FeatureCard from "../components/FeatureCard";

export default function Home() {

  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);


  // Fetch Data 
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Features").select();

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
    
  }, []);

  
  return (
    <div>
        {fetchError && <p className="bg-red-200 border border-red-300 text-red-700 rounded-lg p-3 text-center my-5">{fetchError}</p>}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 overflow-auto">
            {
              data.map((item) => {
                return (
                  <FeatureCard item={item} key={item.id}  />
                );
              })
            }
          </div>
        )}
    </div>
  )
}
