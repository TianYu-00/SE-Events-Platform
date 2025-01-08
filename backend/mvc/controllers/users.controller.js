const { getAllUsers } = require("../models/users.models");
const { clerkClient } = require("@clerk/express");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await clerkClient.users.getUserList();
    const data = users.data;
    res.status(200).json({ success: true, msg: "Users are fetched", data: data });
  } catch (error) {
    next(error);
  }
};

exports.fetchUser = async (req, res, next) => {
  //
  try {
    const { user_id } = req.params;

    // if (!user_id) {
    //   const error = new Error("Missing credentials");
    //   error.code = "MISSING_CREDENTIALS";
    //   return next(error);
    // }

    const user = await clerkClient.users.getUser(user_id);
    res.status(200).json({ success: true, msg: "User is fetched", data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  // https://clerk.com/docs/users/metadata
  try {
    const { role, user_id } = req.body;

    await clerkClient.users.updateUserMetadata(user_id, {
      publicMetadata: {
        role,
      },
    });

    res.status(200).json({ success: true, msg: "Role updated", data: null });
  } catch (error) {
    next(error);
  }
};

exports.initializeUser = async (req, res, next) => {
  try {
    const { user_id, user_publicMetadata } = req.body;

    if (user_publicMetadata && Object.keys(user_publicMetadata).length > 0) {
      const error = new Error("No need to re-initialize");
      error.code = "INITIALIZATION_NOT_REQUIRED";
      return next(error);
    }

    await clerkClient.users.updateUserMetadata(user_id, {
      publicMetadata: {
        role: "user",
      },
    });

    res.status(200).json({ success: true, msg: "Role updated", data: null });
  } catch (error) {
    next(error);
  }
};
