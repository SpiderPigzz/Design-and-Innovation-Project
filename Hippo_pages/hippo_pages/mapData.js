const Images = [
    { image: require("../hippo_pages/assets/mcd.jpg") },
    { image: require("../hippo_pages/assets/mcd.jpg") },
    { image: require("../hippo_pages/assets/mcd.jpg") },
    { image: require("../hippo_pages/assets/mcd.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 1.347,
        longitude: 103.682,
      },
      title: "Amazing Food Place",
      description: "This is the best food place",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 1.344,
        longitude: 103.681,
      },
      title: "Second Amazing Food Place",
      description: "This is the second best food place",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 1.349,
        longitude: 103.683,
      },
      title: "Third Amazing Food Place",
      description: "This is the third best food place",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
];