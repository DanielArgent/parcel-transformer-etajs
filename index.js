const {Transformer} = require("@parcel/plugin");
const Eta = require("eta");

module.exports = new Transformer({
    async transform({asset}) {
        const source = await asset.getCode();
        const result = await Eta.renderAsync(source, {});

        asset.setCode(result);
        asset.type = "html";

        return [asset];
    }
});