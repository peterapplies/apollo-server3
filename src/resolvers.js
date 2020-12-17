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
      if (slug !== "") {
        const foundSlug = await models.Link.findOne({
          where: { slug: slug }
        });
        if (foundSlug == undefined) {
          return await models.Link.create({
            slug,
            description,
            link,
            shortLink: `https://sho.nk/${slug}`
          });
        } else {
          throw new Error(slug + " exists. Try a different link alias.");
        }
      }

      if (slug === "") {
        const MAX_ATTEMPTS = 10;
        // Set a limit MAX_ATTEMPTS so when users hit an error freqently, we can increase the slug char count to 5.
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
              shortLink: `https://sho.nk/${madeSlug}`
            });
          }
        }
        throw new Error("Unable to generate unique alias.");
      }
    }
  }
};

module.exports = resolvers;
