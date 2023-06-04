import { useEffect, useState } from "react";
import axios from "axios";
import uuid from "uuid";

function useFlip(initialVal = true) {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };

  return [isFacingUp, flipCard];
}

function useAxios(baseUrl, name = "") {
  const [cards, setCards] = useState([]);

  const addCard = async () => {
    const response = await axios.get(`${baseUrl}${name}`);
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };

  return [cards, addCard];
}

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (e) {
      console.log(e);
      value = defaultValue;
    }
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;
export { useFlip, useAxios };
