import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions, SelectTravelerList } from "../constants/options";
import { Button } from "../components/ui/button";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({}); // ✅ Fix: object, not array

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value })); // ✅ Fix: use prev state
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`,
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 max-w-8/12 mx-auto">
      <h1 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-gray-500 text-lg mt-3">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* Location */}
      <div className="my-10">
        <h2 className="text-xl font-medium mb-3">
          What is destination of choice?
        </h2>
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleInputChange("location", e.target.value);
          }}
          placeholder="Search city..."
          className="input input-bordered w-full py-5 px-4 border-2 rounded-sm outline-none focus:outline-blue-500"
        />
        {results.length > 0 && (
          <div className="bg-white shadow mt-2 rounded max-h-60 overflow-y-auto">
            {results.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuery(item.display_name);
                  handleInputChange("location", item.display_name); // ✅ Fix: also update formData on select
                  setResults([]);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Days */}
      <div className="my-10">
        <h2 className="text-xl font-medium mb-3">
          How many days are you planning your trip?
        </h2>
        <Input
          className="py-5 px-4 rounded-sm border-2"
          placeholder="Ex. 3"
          type="number"
          onChange={(e) => handleInputChange("days", e.target.value)} // ✅ Fix: wired up
        />
      </div>

      {/* Budget */}
      <div className="my-10">
        <h2 className="text-xl font-medium mb-3">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("budget", item.people)} // ✅ Fix: wired up
              className={`border p-4 rounded-lg cursor-pointer hover:shadow ${
                formData.budget === item.title ? "border-blue-500 shadow" : "" // ✅ Fix: active state
              }`}
            >
              <h1 className="text-4xl">{item.icon}</h1>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers */}
      <div className="my-10">
        <h2 className="text-xl font-medium mb-3">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelerList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("travelers", item.title)} // ✅ Fix: wired up
              className={`border p-4 rounded-lg cursor-pointer hover:shadow ${
                formData.travelers === item.title
                  ? "border-blue-500 shadow"
                  : "" // ✅ Fix: active state
              }`}
            >
              <h1 className="text-4xl">{item.icon}</h1>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end my-10">
        <Button className="p-5">Generate Trip</Button>
      </div>
    </div>
  );
};

export default CreateTrip;
