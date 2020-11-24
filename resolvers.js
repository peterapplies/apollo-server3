const resolvers = {
  Query: {
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    },
    async link(root, { id }, { models }) {
      return models.Link.findByPk(id);
    }
  },
  Mutation: {
    async createLink(root, { slug, description, link }, { models }) {
      return models.Link.create({
        slug,
        description,
        link
      });
    }
  }
};

module.exports = resolvers;
