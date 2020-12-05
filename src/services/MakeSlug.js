function MakeSlug(length) {
  let slug = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return slug;
}

module.exports = MakeSlug;
