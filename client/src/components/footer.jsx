import { Link } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="grid grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 p-4 gap-3 bg-[#18428f] text-white from-neutral-50">
      <div>
        <h4 className="font-semibold">ABOUT NICE HOME</h4>
        <p>
          The world has become so fast paced that people don’t want to stand by
          reading a page of information, they would much rather look at a
          presentation and understand the message. It has come to a point
        </p>
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold">NAVIGATION LINKS</h4>
          <Link className=" hover:text-yellow-500">Home</Link>
          <Link className=" hover:text-yellow-500">Customer Support</Link>
          <Link className=" hover:text-yellow-500">Service Guarantee</Link>
          <Link className=" hover:text-yellow-500">System Feedback</Link>
          <Link className=" hover:text-yellow-500">Privacy Policy</Link>
          <Link className=" hover:text-yellow-500">Terms and Conditions</Link>
          <Link className=" hover:text-yellow-500">Blog</Link>
          <Link className=" hover:text-yellow-500">Contact</Link>
      </div>
      <div>
        <h4 className="font-semibold">NEWSLETTER</h4>
        <p>
          For business professionals caught between high OEM price and mediocre
          print and graphic output.
        </p>
        <div className="flex">
          <input title="Email Address" className="h-8"></input>
          <button className="bg-yellow-400 -ml-4 w-10">
            <AiOutlineSend className=" mx-auto"/>
          </button>
        </div>
      </div>
      <div>
        <h4 className="font-semibold">PARTNERS</h4>
      </div>
    </footer>
  );
}
