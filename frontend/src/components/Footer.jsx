import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-second px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-32 p-5">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm ">
        <div>
          <img src="/logo.png" className="mb-5 w-32 h-auto" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed optio,
            explicabo id doloribus, laborum nulla harum molestias minima eos
            ipsa veritatis, soluta recusandae itaque modi deleniti enim! Beatae,
            debitis harum.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li onClick={() => navigate("/jobs")}>Home</li>
            <li onClick={() => navigate("/jobs")}>Jobs</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>saiedtechit@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@saied83 - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
