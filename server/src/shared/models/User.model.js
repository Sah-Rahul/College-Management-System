import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import SecurityUtils from "../utils/SecurityUtils.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      validate: {
        validator: function (userName) {
          return /^[a-zA-Z0-9_.-]+$/.test(userName);
        },
        message: "Please enter a valid username",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (password) {
          if (
            password &&
            (password.startsWith("$2a$") || password.startsWith("$2b$"))
          ) {
            return true;
          }
          if (password) {
            const validation = SecurityUtils.validatePassword(password);
            return validation.success;
          }
          return true;
        },
        message: function (props) {
          if (
            props.value &&
            !props.value.startsWith("$2a$") &&
            !props.value.startsWith("$2b$")
          ) {
            const validation = SecurityUtils.validatePassword(props.value);
            return validation.errors.join(". ");
          }
          return "Password validation failed";
        },
      },
    },
    role: {
      type: String,
      enum: ["super_admin", "client_admin", "client_viewer"],
      default: "client_viewer",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: function () {
        return this.role !== "super_admin";
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    permissions: {
      canCreateApiKeys: {
        type: Boolean,
        default: false,
      },
      canManageUsers: {
        type: Boolean,
        default: false,
      },
      canViewAnalytics: {
        type: Boolean,
        default: true,
      },
      canExportData: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.index({ clientId: 1, isActive: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);
export default User;
