const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players";

export const fetchPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    console.log("API Response:", result);

    return result.success && result.data && Array.isArray(result.data.players)
      ? result.data.players
      : [];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export const fetchSinglePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();

    console.log("Single Player API Response:", result);

    return result.success && result.data ? result.data.player : null;
  } catch (error) {
    console.error("Error fetching single player:", error);
    return null;
  }
};

export const createPlayer = async (player) => {
  try {
    console.log("Sending Player Data:", player);

    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error:", errorText);
      throw new Error("Failed to create player");
    }

    const result = await response.json();
    console.log("Created Player Response:", result);

    return result.success && result.data && result.data.newPlayer
      ? result.data.newPlayer
      : null;
  } catch (error) {
    console.error("Error creating player:", error.message);
    return null;
  }
};

export const deletePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Server Error:", await response.text());
      throw new Error("Failed to delete player");
    }

    console.log(`Player with ID ${id} has been deleted.`);

    return true;
  } catch (error) {
    console.error("Error deleting player:", error.message);
    return false;
  }
};

export const generateRandomPlayer = () => {
  const names = [
    "Buddy",
    "Max",
    "Charlie",
    "Bella",
    "Lucy",
    "Daisy",
    "Molly",
    "Luna",
    "Bailey",
    "Cooper",
  ];
  const breeds = [
    "Golden Retriever",
    "Labrador",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Boxer",
    "Mixed",
    "Husky",
    "Spaniel",
  ];
  const statuses = ["bench", "active"];

  return {
    name: names[Math.floor(Math.random() * names.length)],
    breed: breeds[Math.floor(Math.random() * breeds.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    imageUrl: `https://loremflickr.com/200/300/dog?random=${Math.floor(
      Math.random() * 1000
    )}`,
  };
};
