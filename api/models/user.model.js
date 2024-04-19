import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F35-no-profile-pictures-for-tiktok-default-collection--746260600768706252%2F&psig=AOvVaw1bVLgo532aDsbTCL4N4hWL&ust=1713547358494000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOji6MKjzIUDFQAAAAAdAAAAABAE"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
