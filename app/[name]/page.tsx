"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCountryQuery } from "@/redux/api";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = ({ params }: any) => {
  const router = useRouter();

  const {
    isFetching: isSearchCountryLoading,
    error,
    data,
  } = useGetSearchCountryQuery(params.name);

  const nativeName = data && data[0].name.official;
  const population = data && data[0].population.toLocaleString();
  const region = data && data[0].region;
  const subregion = data && data[0].subregion;
  const capital = data && data[0].capital;
  const domain = data && data[0].tld[0];
  const languages = data && Object.values(data[0].languages).join(", ");
  const borderCountries = data && data[0].borders;

  if(error) return "No data found"

  return (
    <div className="px-6 md:px-[4rem] py-8 md:py-8 space-y-[4rem] dark:bg-secondary h-screen overflow-x-hidden">
      <Button
        onClick={() => router.back()}
        className="bg-transparent text-black hover:bg-transparent hover:underline dark:text-white dark:bg-primary"
      >
        <MoveLeft size={15} className="mr-2" />
        Back
      </Button>
      {isSearchCountryLoading ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="w-full md:w-6/12">
            <Image
              src={data?.[0]?.flags?.png}
              width={500}
              height={500}
              className="rounded-md"
              alt={data?.[0]?.flags?.alt}
            />
          </div>
          <div className="w-6/12 flex flex-col gap-6">
            <p className="text-2xl font-bold">{data?.[0]?.name?.common}</p>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
              <div className="space-y-2">
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Native Name: <span className="font-light">{nativeName}</span>
                </p>
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Population: <span className="font-light">{population}</span>
                </p>
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Region: <span className="font-light">{region}</span>
                </p>
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Sub Region: <span className="font-light">{subregion}</span>
                </p>
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Capital: <span className="font-light">{capital}</span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Top Level Domain: <span className="font-light">{domain}</span>
                </p>
                <p className="whitespace-nowrap font-medium">
                  {" "}
                  Languages:{" "}
                  <span className="font-light">{languages}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-8">
              <p className="font-medium whitespace-nowrap">Border Countries:</p>

              <div className="flex flex-wrap items-center gap-2 pb-[4rem] md:pb-0">
                {borderCountries?.map((ele: any, idx: number) => (
                  <Link
                    href={`/${ele}`}
                    key={idx}
                    className="shadow-sm px-[2rem] py-[.4rem] text-gray-500 dark:bg-primary dark:text-white capitalize text-xs border rounded-md"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
