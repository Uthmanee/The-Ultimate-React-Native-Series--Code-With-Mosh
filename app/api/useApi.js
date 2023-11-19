import { useState } from "react";

export default useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunction(...args);
    setLoading(false);
    setError(!response.ok);
    setData(response.data);
    // console.log(response.data);

    return response;
  };
  return { data, error, loading, request };
};

// Implementation with firebase
// export default useApi = (apiFunction) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(false);

//   const request = async (...args) => {
//     setLoading(true);
//     const response = await apiFunction(...args);
//     setLoading(false);
//     setError(!response.ok);
//     setData(dataTransformation(response));

//     return response;
//   };

//   const dataTransformation = (response) => {
//     const dataArray = [];

//     const data = response.data;

//     for (key in data) {
//       dataArray.push({ ...data[key] });
//     }

//     return dataArray;
//   };
//   return { data, error, loading, request };
// };
