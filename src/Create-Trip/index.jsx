import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions, SelectTravelerList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast, Toaster } from "sonner";
import { chatSession } from "../service/AIModal";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const OnGenerateTrip = async () => {
    // Validation
    if (!formData?.location) {
      toast.error("Please select a destination.");
      return;
    }

    if (!formData?.days || formData.days < 1) {
      toast.error("Please enter a valid number of days.");
      return;
    }

    if (formData.days > 10) {
      toast.error("Please enter no more than 10 days.");
      return;
    }

    if (!formData?.budget) {
      toast.error("Please select a budget.");
      return;
    }

    if (!formData?.travelers) {
      toast.error("Please select who you're traveling with.");
      return;
    }

    const toastId = toast.loading("Generating your trip... ✈️");

    const prompt = `Generate a travel plan for ${formData.location}, 
${formData.days} days, ${formData.travelers} traveler(s), ${formData.budget} budget.

Return ONLY this JSON structure, be concise:
{
  "tripInfo": {
    "location": "string",
    "days": number,
    "budget": "string",
    "travelers": "string"
  },
  "hotels": [
    {
      "HotelName": "string",
      "HotelAddress": "string",
      "Price": "string",
      "Rating": number,
      "Description": "string",
      "GeoCoordinates": { "lat": number, "lng": number }
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "string",
      "places": [
        {
          "PlaceName": "string",
          "PlaceDetails": "string",
          "TicketPricing": "string",
          "Rating": number,
          "TravelTime": "string",
          "BestTimeToVisit": "string",
          "GeoCoordinates": { "lat": number, "lng": number }
        }
      ]
    }
  }
}

Limits: max 3 hotels, max 3 places per day. Keep all text values short (under 100 chars).`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const rawText = result.response.text();

      // ✅ Strip markdown code fences if present
      const cleaned = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const tripData = JSON.parse(cleaned);
      console.log(tripData);
      toast.success("Trip generated successfully! 🎉", { id: toastId });
    } catch (error) {
      console.error(error);

      if (error instanceof SyntaxError) {
        toast.error("Failed to parse trip data. Please try again.", {
          id: toastId,
        });
      } else {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    }
  };

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
                  handleInputChange("location", item.display_name);
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
          onChange={(e) => handleInputChange("days", e.target.value)}
        />
      </div>

      {/* Budget */}
      <div className="my-10">
        <h2 className="text-xl font-medium mb-3">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("budget", item.title)}
              className={`border p-4 rounded-lg cursor-pointer hover:shadow ${
                formData.budget === item.title ? "border-blue-500 shadow" : ""
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
              onClick={() => handleInputChange("travelers", item.people)}
              className={`border p-4 rounded-lg cursor-pointer hover:shadow ${
                formData.travelers === item.people
                  ? "border-blue-500 shadow"
                  : ""
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
        <Button onClick={OnGenerateTrip} className="p-5">
          Generate Trip
        </Button>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default CreateTrip;
