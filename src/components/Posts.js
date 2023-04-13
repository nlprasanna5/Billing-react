import React, { useEffect, createContext, useState } from "react";
import postStyle from "./posts.module.css";
import Content from "./Content.js";

export const MyContext = createContext();

export default function Posts() {
  const [list, setList] = useState([]);
  const [data, setData] = useState("dfgvdh");

  function handleClick(ele) {
    setData(ele.body);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return (
    <div className={postStyle.container}>
      <div className={postStyle.left}>
        {list.map((ele) => (
          <h4 onClick={() => handleClick(ele)}>{ele.title}</h4>
        ))}
      </div>
      <div className={postStyle.right}>
        <MyContext.Provider value={data}>
          <Content />
        </MyContext.Provider>
      </div>
    </div>
  );
}
