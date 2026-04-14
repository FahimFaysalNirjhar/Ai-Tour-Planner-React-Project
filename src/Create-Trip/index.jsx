import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
    }, 500); // debounce time

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

      <div className="my-10">
        <h2 className="text-xl font-medium mb-3 ">
          What is destination of choice?
        </h2>
        {/* <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            placeholder: "Search city...",
            onChange: (val) => console.log(val),
          }}
        /> */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="input input-bordered w-full px-4 py-2 border-2 rounded-sm outline-none focus:outline-blue-500"
        />

        {results.length > 0 && (
          <div className="bg-white shadow mt-2 rounded max-h-60 overflow-y-auto">
            {results.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuery(item.display_name);
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
    </div>
  );
};

export default CreateTrip;
