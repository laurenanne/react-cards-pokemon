import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

function useFlip(initialVal = true) {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };

  return [isFacingUp, flipCard];
}

function useAxios(baseUrl) {
  const [cards, setCards] = useState([]);

  const addCard = async (name = "") => {
    const response = await axios.get(`${baseUrl}${name}`);
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };

  return [cards, addCard];
}

export { useFlip, useAxios };
