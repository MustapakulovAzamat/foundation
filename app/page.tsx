import ProductCard from "./components/Production/ProductCard";
import Title from "./components/text/Title";

export default async function Home() {

  return (
    <div className="container">
      <div className="my-8">
        <Title>Главная</Title>
        <div className="flex flex-wrap gap-5">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
