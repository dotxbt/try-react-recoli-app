import axios from "axios";

export interface responseProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPost = async () => {
  const res = await axios.get<responseProps[]>("https://jsonplaceholder.typicode.com/posts");
  return res;
};
