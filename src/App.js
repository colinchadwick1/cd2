import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/orgs/${searchTerm}/repos`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [searchTerm]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />

      {isLoading ? (
        <>
          <p>loading...</p>
        </>
      ) : (
        <>
          {data.map((repo) => {
            return (
              <>
                <p>{repo.name}</p>
                <p>{repo.url}</p>
                <p>Stars: {repo.stargazers_count}</p>
                <p>Forks: {repo.forks_count}</p>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
