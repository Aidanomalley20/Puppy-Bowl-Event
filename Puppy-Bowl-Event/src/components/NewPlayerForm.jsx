import { useState } from "react";
import { createPlayer } from "../API";
import { useNavigate } from "react-router-dom";

const NewPlayerForm = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [owner, setOwner] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlayer = { name, team, owner };
    await createPlayer(newPlayer);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Player</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default NewPlayerForm;
