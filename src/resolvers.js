const MakeSlug = require("./services/MakeSlug");

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
      if (slug !== undefined) {
        const foundSlug = await models.Link.findOne({
          where: { slug: slug }
        });
        if (foundSlug === undefined) {
          return await models.Link.create({
            slug,
            description,
            link,
            shortLink: `https://shink.com/${slug}`
          });
        } else {
          throw new Error(slug + " exists. Try a new short description.");
        }
      }

      if (slug === undefined) {
        const MAX_ATTEMPTS = 10;
        let attempts = 0;
        while (attempts < MAX_ATTEMPTS) {
          attempts++;
          let madeSlug = MakeSlug(4);
          const foundSlug = await models.Link.findOne({
            where: { slug: madeSlug }
          });
          if (foundSlug !== undefined) {
            return await models.Link.create({
              slug: madeSlug,
              description,
              link,
              shortLink: `https://shink.com/${madeSlug}`
            });
          }
        }
        throw new Error("Unable to generate unique alias.");
      }
    }
  }
};

module.exports = resolvers;
