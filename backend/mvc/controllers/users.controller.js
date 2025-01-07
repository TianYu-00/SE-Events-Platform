const { getAllUsers } = require("../models/users.models");
const { clerkClient } = require("@clerk/express");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await clerkClient.users.getUserList();
    res.status(200).json({ success: true, msg: "Users are fetched", data: users });
  } catch (error) {
    next(error);
  }
};

exports.fetchUser = async (req, res, next) => {
  //
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).json({ error: "User ID is required" });
    }

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
