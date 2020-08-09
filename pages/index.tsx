import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { InlineIcon } from "@iconify/react";
import telegram from "@iconify/icons-logos/telegram";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Build a list!</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> Build a list!</h1>
        <p className={styles.description}>
          A Telegram bot where people comes together and build a list.
        </p>
        <div className={styles.grid}>
          <a href="https://t.me/buildalistbot" className={styles.card}>
            <p><InlineIcon icon={telegram} /> Try it out</p>
          </a>

          <a href="https://github.com/blueset/BuildAList" className={styles.card}>
            <p>Source</p>
          </a>
        </div>
      </main>
    </div>
  );
}
