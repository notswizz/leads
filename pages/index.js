// pages/index.js
import Head from 'next/head';
import CameraCapture from '../components/CameraCapture';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Camera App</title>
        <meta name="description" content="Capture and transcribe images, then generate new images with AI" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl mb-6">AI Camera App</h1>
        <CameraCapture />
      </main>
    </div>
  );
}
