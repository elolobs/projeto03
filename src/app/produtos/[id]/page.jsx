"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import  "./saiba2.css";

export default function Produto() {
  const params = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((resposta) => resposta.json())
      .then((dados) => setProduto(dados));
  }, [params.id]);

  return (
    <main className="page">
      {produto && <>
        <Link href="/produtos">Voltar aos produtos</Link>
        <h1>{produto.title}</h1>
        <img className="image" src={produto.thumbnail} alt={produto.title} />
        <p>{produto.description}</p>
        <p>Categoria: {produto.category}</p>
        <p>Preço: ${produto.price}</p>
      </>}
    </main>
  );
}