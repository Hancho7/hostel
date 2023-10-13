import Lottie from "lottie-react";
import contactus from "../assets/contactus.json";
import { Link } from "react-router-dom";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
export default function ContactUs() {
  return (
    <div className="flex flex-col items-center justify-center my-10 mx-4">
      <h1 className=" font-bold text-2xl md:text-4xl lg:text-6xl text-[#476faf]">
        Contact Us
      </h1>
      <p className=" font-bold text-base md:text-lg lg:text-2xl">
        Any questons or remarks? just send us a message!
      </p>
      <div className=" md:flex md:flex-row-reverse md:gap-16 lg:gap-32">
        <section>
          <Lottie animationData={contactus} />
        </section>
        <section className="flex flex-col items-center justify-center gap-4">
          <h1 className=" font-semibold text-base text-[#476faf] md:text-lg lg:text-2xl">
            Contact information
          </h1>
          <span
            itemProp="telephone"
            className="flex items-center justify-center gap-2 w-48 h-9 border-2 border-[#476faf] rounded-full text-[#476faf]"
          >
            <BiPhoneCall />
            <Link to="tel:+2330570475513">Call Now</Link>
          </span>
          <a
            itemProp="email"
            href="mailto:hanchotech@gmail.com"
            className="flex items-center justify-center gap-2 w-48 h-9 border-2 border-[#476faf] rounded-full text-[#476faf]"
          >
            <AiOutlineMail />
            Contact via email
          </a>

          <Link></Link>
        </section>
      </div>
    </div>
  );
}
