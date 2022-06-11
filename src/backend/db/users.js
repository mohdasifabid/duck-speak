import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Duck",
    lastName: "Speak",
    username: "duckspeak",
    password: "duckSpeak123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Mr",
    lastName: "Mango",
    username: "mango",
    password: "mango123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },{
    _id: uuid(),
    firstName: "Mr",
    lastName: "Watermelon",
    username: "watermelon",
    password: "watermelon123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
