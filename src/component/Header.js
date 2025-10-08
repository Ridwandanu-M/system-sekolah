import Image from "next/image";
import Logo_Seyegan from "../../public/Logo_Seyegan.png";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <Image src={Logo_Seyegan} alt="Logo Seyegan" width={100} />
        </div>
      </div>
    </header>
  );
};

export default Header;
