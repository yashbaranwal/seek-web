"use client";

import CountryCard from "@/components/country-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { myApi } from "@/redux/api";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import Loading from "./loading";
import { Search } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [
    getAllCountries,
    { isFetching: isAllCountriesLoading, error: allCountriesError },
  ] = myApi.endpoints.getAllCountries.useLazyQuery();

  const [
    getSearchCountry,
    { isFetching: isSearchCountryLoading, error: searchCountryError },
  ] = myApi.endpoints.getSearchCountry.useLazyQuery();

  const [getRegion, { isFetching: isRegionLoading, error: regionError }] =
    myApi.endpoints.getRegion.useLazyQuery();

  const [countries, setCountries] = useState([]);

  const [regionOptions, setRegionOptions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const fetchSearchCountry = async () => {
    try {
      const res = await getSearchCountry(debouncedSearchTerm);
      if (res.data) {
        setCountries(res.data);
      } else {
        setCountries([]);
      }
    } catch (error) {
      setCountries([]);
      console.error(error, "e");
    }
  };

  const fetchAllCountries = async () => {
    try {
      const res = await getAllCountries();
      if (res.data) {
        setCountries(res.data);
        const regions = res.data.map((ele: any) => ele.region);
        const uniqueRegs = [...new Set(regions)];
        setRegionOptions(uniqueRegs);
      } else {
        setCountries([]);
      }
    } catch (error) {
      setCountries([]);
      console.error(error, "e");
    }
  };

  const handleRegion = async (value: string) => {
    setSelectedRegion(value);
    try {
      const res = await getRegion(value);
      if (res.data) {
        setCountries(res.data);
      } else {
        setCountries([]);
      }
    } catch (error) {
      setCountries([]);
      console.error(error, "e");
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchCountry();
    } else {
      fetchAllCountries();
    }
  }, [debouncedSearchTerm]);

  return (
    <main className="min-h-screen px-6 md:px-[4rem] py-4 md:py-6 flex flex-col space-y-[3rem] bg-accent dark:bg-secondary">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        
        {/* search bar */}
        <div
          className="flex items-center space-x-2 bg-white dark:bg-primary shadow-sm rounded-md w-full md:w-4/12 px-4 py-2
        "
        >
          <Search size={15} />
          <Input
            className="text-xs bg-white dark:bg-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a country"
          />
        </div>

        <Select onValueChange={(val) => handleRegion(val)}>
          <SelectTrigger className="w-[200px] md:w-[180px] text-xs border-none py-6 px-4 shadow-sm dark:bg-primary">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent className="dark:bg-primary">
            <SelectGroup>
              {regionOptions &&
                regionOptions.length !== 0 &&
                regionOptions.map((reg, idx) => (
                  <SelectItem key={idx} value={reg}>
                    {reg}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-[4rem] px-8 md:px-0 pb-[4rem]">
        {isAllCountriesLoading || isSearchCountryLoading || isRegionLoading ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) : (
          countries &&
          countries.length !== 0 &&
          countries.map((country: any, idx: number) => (
            <CountryCard
              key={idx}
              flag={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
              info={country.flags.alt}
            />
          ))
        )}
      </div>
    </main>
  );
}
