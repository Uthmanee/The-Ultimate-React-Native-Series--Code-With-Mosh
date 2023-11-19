import apiClient from "./client";

const endPoint = "/listings";

const getListings = () => apiClient.get(endPoint);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();

  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  console.log(data);

  return apiClient.post(endPoint, data._parts, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getListings,
  addListing,
};

// implementation with firebase
// import apiClient from "./client";

// const endPoint = "/listings.json";

// const getListings = () => apiClient.get(endPoint);

// const addListing = (listing, onUploadProgress) => {
//   const data = new FormData();

//   data.append("title", listing.title);
//   data.append("price", listing.price);
//   data.append("categoryId", listing.category.value);
//   data.append("description", listing.description);

//   listing.images.forEach((image, index) => {
//     data.append("images", {
//       name: "image" + index,
//       type: "image/jpeg",
//       uri: image,
//     });
//   });

//   if (listing.location)
//     data.append("location", JSON.stringify(listing.location));

//   console.log(data);

//   return apiClient.post(endPoint, data._parts, {
//     onUploadProgress: (progress) =>
//       onUploadProgress(progress.loaded / progress.total),
//   });
// };

// export default {
//   getListings,
//   addListing,
// };
