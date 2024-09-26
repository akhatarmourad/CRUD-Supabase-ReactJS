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
        {fetchError && <p>{fetchError}</p>}
        {data && (
          <div className="flex flex-wrap justify-center gap-5 mt-10">
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
