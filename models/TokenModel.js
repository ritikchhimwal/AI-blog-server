import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = model("Token", TokenSchema);

export default Token;
