import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link href="news">Click to go to news page</Link>
    </div>
  );
};

export default HomePage;
