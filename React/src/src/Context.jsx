import React, { createContext, useReducer } from "react";

export const Context = createContext(null);


function reducer(object, action) {
  switch (action.type) {
    case "inc":
      return {
        ...object,
        number: object.number + 1,
      };

    case "dec":
      return {
        ...object,
        number: object.number - 1,
      };
  }
}

const object = {
  name: "Rohit",
  number: 1,
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, object);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};