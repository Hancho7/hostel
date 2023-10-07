import Part1 from "../components/homeparts/part1"
import Part2 from "../components/homeparts/part2"
import Part3 from "../components/homeparts/part3"
export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-20">
      <Part1/>
      <Part2/>
      <Part3/>
      
    </div>
  )
}
