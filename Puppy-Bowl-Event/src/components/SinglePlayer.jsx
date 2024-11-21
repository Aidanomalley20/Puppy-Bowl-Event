import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSinglePlayer, deletePlayer } from "../API";

const SinglePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      const fetchedPlayer = await fetchSinglePlayer(id);
      console.log("Fetched Single Player:", fetchedPlayer);
      setPlayer(fetchedPlayer);
    };

    getPlayer();
  }, [id]);

  const handleDelete = async () => {
    const success = await deletePlayer(id);
    if (success) {
      navigate("/");
    } else {
      alert("Failed to delete player. Please try again.");
    }
  };

  return player ? (
    <div>
      <h2>{player.name}</h2>
      <img
        src={player.imageUrl}
        alt={`${player.name}`}
        style={{ width: "200px", height: "300px" }}
      />
      <p>Breed: {player.breed || "Unknown"}</p>
      <p>Status: {player.status}</p>
      <button onClick={handleDelete}>Delete Player</button>
    </div>
  ) : (
    <p>Loading player details...</p>
  );
};

export default SinglePlayer;
