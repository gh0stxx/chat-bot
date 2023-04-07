import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mainImage from '@/assets/images/tyr.png'
import { Button, Form, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'


export default function Home() {

  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();

    if (prompt) {
      try {
        setQuote('');
        setError(false);
        setLoading(true);

        const res = await fetch('/api/ai?prompt=' + encodeURIComponent(prompt));
        const body = await res.json();
        setQuote(body.quote);

        const { quote } = await res.json();
        setQuote(quote);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Tyr Bot</title>
        <meta name="discription" content="Tyr Bot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Tyr Bot</h1>
        <h2>powered by GPT-3</h2>
        <div>"Seeking wisdom from Tyr is like asking a sword for advice - it may be sharp and powerful, but it lacks the nuance and understanding of a wise counselor."</div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt="Tyr Bot"
            priority
            className={styles.mainImage}
          />
        </div>

        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Seek your wisdom from Tyr</Form.Label>
            <Form.Control name='prompt' placeholder='Ask and you will recieve' maxLength={100} />
          </Form.Group>
          <Button variant='dark' type='submit' className='mb-3' disabled={loading}>
            Submit
          </Button>

        </Form>
        {loading && <Spinner animation='border' variant='dark' />}
        {error && <div>There was an error</div>}
        {quote && <h5>{quote}</h5>}
      </main>
    </>

  )
}
