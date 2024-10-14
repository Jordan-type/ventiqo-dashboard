import React from "react";

const CURRENT_YEAR = new Date().getFullYear();
const LINKS = ["Company", "About Us", "Team", "Products", "Blog"];

export function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        <div className="flex w-full py-10 mb-5 md:mb-20 flex-col justify-center items-center bg-gray-900 max-w-6xl mx-auto rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl text-center font-bold text-white">
            Join now and get 30% OFF!
          </h1>
          <p className="md:w-7/12 text-center my-3 text-base text-white">
            Don&apos;t miss out on this exclusive offer that will end soon.
          </p>
          <div className="flex w-full md:w-fit gap-3 mt-2 flex-col md:flex-row">
            <button className="bg-white text-black py-2 px-4 rounded-md">
              Get Started
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <a
            href="https://www.thelightideas.co.ke"
            target="_blank"
            rel="noreferrer"
            className="text-gray-900 font-bold hover:text-gray-900 "
          >
            Ventiqo
          </a>
          <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            <button className="text-gray-500 hover:text-black transition">
              <i className="fa-brands fa-twitter text-lg" />
            </button>
            <button className="text-gray-500 hover:text-black transition">
              <i className="fa-brands fa-youtube text-lg" />
            </button>
            <button className="text-gray-500 hover:text-black transition">
              <i className="fa-brands fa-instagram text-lg" />
            </button>
            <button className="text-gray-500 hover:text-black transition">
              <i className="fa-brands fa-github text-lg" />
            </button>
          </div>
        </div>
        <p className="text-center mt-12 font-normal text-gray-700">
          &copy; {CURRENT_YEAR} Made with{" "}
          <span className="text-red-500">♥</span> by{" "}
          <a
            href="https://www.thelightideas.co.ke"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            Ventiqo
          </a>{" "}
          and{" "}
          <a
            href="https://www.thelightideas.co.ke"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700"
          >
            The Light Ideas Labs
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
