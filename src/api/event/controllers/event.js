const { createCoreController } = require("@strapi/strapi").factories;
const { sanitize } = require("@strapi/utils");

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  //Find with populate ----------------------------------------
  async find(ctx) {
    const populateList = ["image", "user"];

    // Push any additional query params to the array
    populateList.push(ctx.query.populate);
    ctx.query.populate = populateList.join(",");
    this.find(ctx);
    return ctx.content;
  },

  // Create user event----------------------------------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    this.create(ctx);
    return entity;
  },

  // Update user event----------------------------------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;

    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };

    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    this.update(ctx);
    return entity;
  },

  // Delete a user event----------------------------------------
  async delete(ctx) {
    const { id } = ctx.params;

    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };

    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    this.delete(ctx);
    return ctx.response;
  },

  // Get logged in users----------------------------------------
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const query = {
      filters: {
        user: { id: user.id },
      },
    };

    const data = await this.find({ query: query });
    if (!data) {
      return ctx.notFound();
    }

    const sanitizedEntity = await sanitize.contentAPI.output(data, ctx);
    return sanitizedEntity;
  },
}));
