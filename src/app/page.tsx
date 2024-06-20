import MainContent from './components/MainContent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap content-start justify-center gap-10 p-24">
      <h1 className="w-full text-center text-4xl">Cosmos Starter Challenge</h1>
      <p className="text-white/70 text-lg w-full text-center">
        Welcome to the Cosmos Starter Challenge!
      </p>
      <MainContent />
    </main>
  );
}
