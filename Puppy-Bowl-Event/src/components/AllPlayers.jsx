import { useState, useEffect } from "react";
import { fetchPlayers } from "../API";
import { useNavigate } from "react-router-dom";
import GenerateRandomPlayerButton from "./GenerateRandomPlayerButton";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchAndSetPlayers = async () => {
    const fetchedPlayers = await fetchPlayers();
    console.log("Fetched Players:", fetchedPlayers);
    setPlayers(Array.isArray(fetchedPlayers) ? fetchedPlayers : []);
  };

  useEffect(() => {
    fetchAndSetPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>All Players</h1>
      <GenerateRandomPlayerButton onPlayerAdded={fetchAndSetPlayers} />
      <input
        type="text"
        placeholder="Search players"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px" }}
      />
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player) => (
          <div className="player-card" key={player.id}>
            <img src={player.imageUrl} alt={`${player.name}`} />
            <h4>{player.name}</h4>
            <p>Breed: {player.breed || "Unknown"}</p>
            <p>Status: {player.status}</p>
            <button onClick={() => navigate(`/players/${player.id}`)}>
              See Details
            </button>
          </div>
        ))
      ) : (
        <p>No players match your search or no players available.</p>
      )}
    </div>
  );
};

export default AllPlayers;
