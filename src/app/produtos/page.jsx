"use client";

import { useEffect, useState } from "react";
import CardProduto from "@/components/CardProduto";
import styles from "./page.module.css";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function carregarProdutos() {
      try {
        const resposta = await fetch("https://dummyjson.com/products?limit=30", {
          signal: controller.signal,
        });
        if (!resposta.ok) throw new Error("Falha ao buscar produtos");
        const dados = await resposta.json();
        setProdutos(dados.products);
        setStatus("success");
      } catch (erro) {
        if (!controller.signal.aborted) setStatus("error");
      }
    }

    carregarProdutos();
    return () => controller.abort();
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/produtos">VITRINE<span>.</span></a>
        <p className={styles.headerNote}>CURADORIA DE PRODUTOS</p>
      </header>

      <section className={styles.catalog}>
        <div className={styles.intro}>
          <p className={styles.kicker}>ESCOLHAS PARA O SEU DIA A DIA</p>
          <h1>Encontre algo <em>especial.</em></h1>
          <p className={styles.description}>Uma seleção de produtos para explorar, comparar e conhecer melhor.</p>
        </div>

        {status === "loading" && <p className={styles.message}>Carregando produtos...</p>}
        {status === "error" && (
          <div className={styles.message} role="alert">
            Não foi possível carregar os produtos. Verifique sua conexão e atualize a página.
          </div>
        )}
        {status === "success" && (
          <>
            <div className={styles.results}>
              <span>CATÁLOGO</span>
              <span>{produtos.length} PRODUTOS</span>
            </div>
            <div className={styles.grid}>
              {produtos.map((produto) => <CardProduto key={produto.id} produto={produto} />)}
            </div>
          </>
        )}
      </section>
      <footer className={styles.footer}>FEITO PARA DESCOBRIR · DUMMYJSON</footer>
    </main>
  );
}