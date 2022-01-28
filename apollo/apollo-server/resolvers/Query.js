const Query = {
  mainCards: (parent, args, { mainCards }) => mainCards,
  animals: (parent, args, { animals }) => animals,
  animal: (parent, args, { animals }) => {
    return animals.find((animal) => args.slug === animal.slug);
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, args, { categories }) => {
    return categories.find((category) => args.slug === category.slug);
  },
};

module.exports = Query;
