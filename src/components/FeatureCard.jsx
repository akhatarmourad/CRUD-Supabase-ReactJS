import { useNavigate } from "react-router-dom";
import {} from "react-icons";

export default function FeatureCard({ item }) {
  
  const {id, title, desc, rating} = item;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/${id}`)} className="bg-opacity-50 bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-gray-500 text-sm mb-3">{desc.slice(0, 50)}...</p>
        <div>
          <span className="font-semibold text-gray-600">{rating} Stars</span>
          <div>

          </div>
        </div>
    </div>
  )
}
