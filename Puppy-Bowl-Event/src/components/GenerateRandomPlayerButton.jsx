import { generateRandomPlayer, createPlayer } from "../API";
import PropTypes from "prop-types";
const GenerateRandomPlayerButton = ({ onPlayerAdded }) => {
  const handleGenerate = async () => {
    const newPlayer = generateRandomPlayer();
    const createdPlayer = await createPlayer(newPlayer);

    if (createdPlayer) {
      alert(`Player "${createdPlayer.name}" has been added!`);
      if (onPlayerAdded) onPlayerAdded(); // Refresh player list
    } else {
      alert("Failed to add player. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGenerate}
      style={{
        margin: "10px",
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Generate Random Player
    </button>
  );
};

GenerateRandomPlayerButton.propTypes = {
  onPlayerAdded: PropTypes.func.isRequired,
};

export default GenerateRandomPlayerButton;
