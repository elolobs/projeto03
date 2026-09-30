"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const propriedades = [
  { chave: "description", rotulo: "Descrição" },
  { chave: "category", rotulo: "Categoria" },
  { chave: "price", rotulo: "Preço", formatar: (valor) => `$${valor.toFixed(2)}` },
  { chave: "discountPercentage", rotulo: "Desconto", formatar: (valor) => `${valor}%` },
  { chave: "rating", rotulo: "Avaliação", formatar: (valor) => `${valor} / 5` },
  { chave: "stock", rotulo: "Estoque", formatar: (valor) => `${valor} unidades` },
  { chave: "brand", rotulo: "Marca" },
  { chave: "sku", rotulo: "SKU" },
  { chave: "warrantyInformation", rotulo: "Garantia" },
  { chave: "returnPolicy", rotulo: "Política de devolução" },
];

export default function ProdutoDetalhesPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function carregarProduto() {
      try {
        const resposta = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!resposta.ok) throw new Error("Produto não encontrado");
        setProduto(await resposta.json());
        setStatus("success");
      } catch (erro) {
        if (!controller.signal.aborted) setStatus("error");
      }
    }

    carregarProduto();
    return () => controller.abort();
  }, [id]);

  if (status === "loading") {
    return <main className={styles.state}>Carregando produto...</main>;
  }

  if (status === "error" || !produto) {
    return (
      <main className={styles.state}>
        <p>Não foi possível encontrar este produto.</p>
        <Link href="/produtos">Voltar ao catálogo</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/produtos">VITRINE<span>.</span></Link>
        <Link className={styles.back} href="/produtos">← Voltar ao catálogo</Link>
      </header>

      <article className={styles.product}>
        <div className={styles.visual}>
          <img src={produto.images?.[0] || produto.thumbnail} alt={produto.title} />
        </div>
        <div className={styles.content}>
          <p className={styles.kicker}>{produto.category}</p>
          <h1>{produto.title}</h1>
          <p className={styles.price}>${produto.price.toFixed(2)}</p>
          <div className={styles.details}>
            {propriedades.map(({ chave, rotulo, formatar }) => {
              const valor = produto[chave];
              return (
                <section className={styles.detail} key={chave}>
                  <h2>{rotulo}</h2>
                  <p>{valor == null ? "Não informado" : formatar ? formatar(valor) : valor}</p>
                </section>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
}