import Link from "next/link";

const Home = () => {
  return (
    <div>
      Hello World.{" "}
      <ul>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/ssr">
            <a>SSR</a>
          </Link>
        </li>
        <li>
          <Link href="/ssg">
            <a>SSG</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
