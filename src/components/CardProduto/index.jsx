import Link from "next/link";
import styles from "./cardProduto.module.css";

export default function CardProduto({ produto }) {
  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} href={`/produtos/${produto.id}`} aria-label={`Saiba mais sobre ${produto.title}`}>
        <img className={styles.image} src={produto.thumbnail} alt={produto.title} />
      </Link>
      <h2 className={styles.title}>{produto.title}</h2>
      <Link className={styles.link} href={`/produtos/${produto.id}`}>
        Saiba mais <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}