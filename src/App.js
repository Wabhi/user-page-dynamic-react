import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

const UserInfo = ({ match }) => {
  const {
    params: { personId }
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${personId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [personId]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.name}</h1>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  return (
    <>
      {!isLoading &&
        data.map((user, index) => {
          return (
            <div className="col-10 col-md-4 mt-5" key={user.id}>
              <div className="card p-2">
                <div className="d-flex align-items-center">
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0 textLeft"> {user.name} </h4>
                    <span className="text-left">{user.username}</span>
                    <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                      <div className="d-flex flex-column">
                        <span className="articles">Email</span>{" "}
                        <span className="number1">{user.email}</span>{" "}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="followers">Phone</span>{" "}
                        <span className="number2">{user.phone}</span>{" "}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="rating">Website</span>{" "}
                        <span className="number3">{user.website}</span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/users/${index + 1}`}>Info</Link>
              </div>
            </div>
          );
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={UserPage} />
        <Route path="/users/:personId" component={UserInfo} />
      </Router>
    </>
  );
};

export default App;
