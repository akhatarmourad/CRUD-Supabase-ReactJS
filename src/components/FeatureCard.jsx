export default function FeatureCard({ item }) {
  
  const {id, title, desc, rating} = item;

  return (
    <div className="bg-slate-100 p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-gray-500 text-sm mb-3">{desc}</p>
        <span className="font-semibold">{rating} Stars</span>
    </div>
  )
}
