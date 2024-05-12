import Image from "next/image";
import { useRouter } from "next/navigation";

interface CountryCardProps {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
  info: string;
}

const CountryCard = ({
  flag,
  name,
  population,
  region,
  capital,
  info,
}: CountryCardProps) => {

  const router = useRouter()

  return (
    <div className="bg-white dark:bg-primary rounded-sm shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition-all duration-150"
    onClick={() => router.push(`/${name}`)}
    >
      <div>
      <Image src={flag} width={300} height={100} alt={info} />
      </div>

      <div className="p-4 space-y-4">
        <p className="text-lg font-bold">{name}</p>

        <div className="text-sm space-y-1">
          <p className="font-medium">Population: <span className="font-light">{population.toLocaleString()}</span></p>
          <p className="font-medium">Region: <span className="font-light">{region}</span></p>
          <p className="font-medium">Capital: <span className="font-light">{capital}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
