import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Twitter from "../assets/twitter.png";

function Footer() {
  return (
    <div className="bottom-0 flex w-full flex-col items-center bg-[#F1C831] px-4 py-8">
      <div className="mb-10 flex flex-row items-center justify-center">
        <button>
          <img
            alt="facebook"
            className="h-10 w-10 object-contain"
            src={Facebook}
          />
        </button>
        <button className="mx-5">
          <img
            alt="instagram"
            className="h-10 w-10 object-contain"
            src={Instagram}
          />
        </button>
        <button>
          <img
            alt="twitter"
            className="h-10 w-10 object-contain"
            src={Twitter}
          />
        </button>
      </div>
      <div className="flex max-w-[500px] items-center justify-center text-center text-sm">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium,
          quibusdam fugiat? Nemo cumque ex quo porro quisquam molestias commodi?
          Incidunt delectus provident vel dolore quibusdam recusandae modi
          similique itaque repudiandae.
        </p>
      </div>
    </div>
  );
}

export default Footer;
