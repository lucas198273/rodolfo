import { useParams } from "react-router-dom";
import { perfumes } from "../../data/Product";
import type { Perfume } from "../../types/Perfume";

const ProductDetail = () => {
  const { id } = useParams();
  const perfume: Perfume | undefined = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return <p className="text-center mt-20 text-red-500">Perfume não encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10 text-blue-900">
      <h1 className="text-3xl font-bold mb-4">{perfume.name}</h1>
      <img src={perfume.imageUrl} alt={perfume.name} className="w-full max-h-96 object-contain mb-4" />
      <p className="mb-2">{perfume.description}</p>
      <h2 className="font-semibold mb-1">Notas:</h2>
      <ul className="list-disc list-inside mb-4">
        {perfume.notes.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
      <p className="text-xl font-bold">R$ {perfume.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetail;
