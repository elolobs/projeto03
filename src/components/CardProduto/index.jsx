import Link from "next/link";
import "./cardProduto.css";

export default function CardProduto({ produto }) {
  return (
    <article className="card">
      <Link href={`/produtos/${produto.id}`}>
        <img className="image" src={produto.thumbnail} alt={produto.title} />
        <h2>{produto.title}</h2>
        <p>${produto.price}</p>
      </Link>
    </article>
  );
}