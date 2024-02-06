import Part1 from "../components/homeparts/part1";
import Part2 from "../components/homeparts/part2";
import Part3 from "../components/homeparts/part3";
import Part4 from "../components/homeparts/part4";
import Part5 from "../components/homeparts/part5";
import Navbar from "../components/navBar";
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar bgColor="#18223C" position="sticky" zIndex={9999} />
      <Part4 />
      <Part1 />
      <Part5 />
      <Part2 />
      <Part3 />
      <Footer/>
    </div>
  );
}
