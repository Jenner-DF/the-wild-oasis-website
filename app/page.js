import bg from "@/public/bg.png";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    // mt-24
    <>
      <div className="flex h-[calc(100vh-7rem)] flex-col gap-4">
        <Image
          src={bg}
          fill
          className="object-cover object-top"
          placeholder="blur"
          quality={100}
          alt="Mountains and forests with two cabins"
        />
        <div className="relative h-[calc(100vh-7rem)] justify-center pt-24 text-center">
          <h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
          >
            Explore luxury cabins
          </Link>
        </div>
      </div>
      <div className="mt-28 p-8">
        <h1 className="text-center text-7xl">Our Cabins</h1>
        <ul>
          <li>cabin 1</li>
          <li>cabin 2</li>
          <li>cabin 3</li>
          <li>cabin 1</li>
          <li>cabin 2</li>
          <li>cabin 3</li>
          <li>cabin 1</li>
          <li>cabin 2</li>
          <li>cabin 3</li>
          <li>cabin 1</li>
          <li>cabin 2</li>
          <li>cabin 3</li>
          <li>cabin 1</li>
          <li>cabin 2</li>
          <li>cabin 3</li>
        </ul>
      </div>
      <footer>this is footer</footer>
    </>
  );
}
