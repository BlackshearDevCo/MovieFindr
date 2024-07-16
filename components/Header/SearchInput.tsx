"use client";

import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

type People = {
  id: number;
  name: string;
};

const people: People[] = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export function SearchInput() {
  const [selectedPerson, setSelectedPerson] = useState<Nullable<People>>(null);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedPerson}
      onChange={setSelectedPerson}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(person: Maybe<People>) => person?.name || query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a movie..."
        className="px-4 py-2 rounded text-text w-80"
      />
      <ComboboxOptions
        anchor="bottom"
        className="z-50 border-2 border-secondary drop-shadow empty:invisible w-80 my-2 rounded py-2 bg-background"
      >
        {filteredPeople.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="data-[focus]:bg-blue-100 px-4 py-2 font-medium"
          >
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
