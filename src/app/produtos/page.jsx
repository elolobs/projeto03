"use client"

import { useState, useEffect } from "react";
import CardProduto from "@/components/CardProduto";
import styles from "./page.module.css";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados.products));
  }, []);

  return (
    <main className={styles.page}>
      <h1>Catálogo de Produtos</h1>
      <div className={styles.grid}>
        {produtos.map((produto) => <CardProduto key={produto.id} produto={produto} />)}
      </div>
    </main>
  );
}