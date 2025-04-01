const User = require('../models/User');
const Recipe = require('../models/Recipe');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalRecipes = await Recipe.countDocuments();
        const totalComments = await Recipe.aggregate([
            { $unwind: "$comments" },
            { $count: "totalComments" }
        ]);
        const totalCommentsCount = totalComments.length > 0 ? totalComments[0].totalComments : 0;
        
        // Get top users based on the number of recipes posted
        const topUsers = await Recipe.aggregate([
            { $group: { _id: "$authorID", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Populate user details
        for (let user of topUsers) {
            const userInfo = await User.findById(user._id).select("name");
            user.userName = userInfo ? userInfo.name : "Unknown";
        }

        // Top recipes based on ratings
        const topRatedRecipes = await Recipe.aggregate([
            { $unwind: "$ratings" },
            {
                $group: {
                    _id: { id: "$_id", title: "$title" },
                    avgRating: { $avg: "$ratings.rating" }
                }
            },
            { $sort: { avgRating: -1 } },
            { $limit: 5 }
        ]);

        // Top recipes based on comments
        const topCommentedRecipes = await Recipe.aggregate([
            { $unwind: "$comments" },
            {
                $group: {
                    _id: { id: "$_id", title: "$title" },
                    totalComments: { $sum: 1 }
                }
            },
            { $sort: { totalComments: -1 } },
            { $limit: 5 }
        ]);

        // Top tags (based on number of recipes per tag)
        const tagStats = await Recipe.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

         // Top Users by Number of Comments Posted
         const topCommenters = await Recipe.aggregate([
            { $unwind: "$comments" },
            { 
                $group: {
                    _id: "$comments.userID",
                    userName: { $first: "$comments.userName" },
                    profilePicture: { $first: "$comments.profilePicture" },
                    totalComments: { $sum: 1 }
                }
            },
            { $sort: { totalComments: -1 } },
            { $limit: 5 }
        ]);

        res.json({
            users: totalUsers - 1,
            recipes: totalRecipes,
            totalComments: totalCommentsCount,
            topUsers,
            topRatedRecipes,
            topCommentedRecipes,
            topTags: tagStats,
            topCommenters
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching admin stats", error });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};


// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error });
    }
};

module.exports = { getAdminStats, getUsers, deleteUser, getRecipes, deleteRecipe };