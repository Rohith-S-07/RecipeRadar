import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import LottiePlayer from "../LottiePlayer";


Chart.register(...registerables);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${config.BASE_URL}/admin/stats`);
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <div className="text-muted text-center">
            <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
            <br />
            Analyzing the data, please wait...
        </div>
    }

    const userDistributionData = {
        labels: ["Admin", "Users"],
        datasets: [
            {
                data: [1, stats.users],
                backgroundColor: ["#FF5733", "#36A2EB"],
            },
        ],
    };

    const topUsersData = {
        labels: stats.topUsers.map((user) => user.userName),
        datasets: [
            {
                label: "Recipes Created",
                data: stats.topUsers.map((user) => user.count),
                backgroundColor: "#FFCD56",
            },
        ],
    };

    const topRatedRecipesData = {
        labels: stats.topRatedRecipes.map((recipe) => recipe._id.title),
        datasets: [
            {
                label: "Average Rating",
                data: stats.topRatedRecipes.map((recipe) => recipe.avgRating.toFixed(1)),
                backgroundColor: "#36A2EB",
            },
        ],
    };

    const topCommentedRecipesData = {
        labels: stats.topCommentedRecipes.map((recipe) => recipe._id.title),
        datasets: [
            {
                label: "Total Comments",
                data: stats.topCommentedRecipes.map((recipe) => recipe.totalComments),
                backgroundColor: "#FF6384",
            },
        ],
    };

    const topTagsData = {
        labels: stats.topTags.map((tag) => tag._id),
        datasets: [
            {
                data: stats.topTags.map((tag) => tag.count),
                backgroundColor: ["#FFCD56", "#36A2EB", "#FF6384", "#4CAF50", "#9966FF"],
            },
        ],
    };

    // Data for Top Commenting Users Chart
    const topCommentersData = {
        labels: stats.topCommenters.map(u => u.userName),
        datasets: [{
            label: "Comments",
            data: stats.topCommenters.map(u => u.totalComments),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCD56", "#4CAF50", "#9966FF"],
        }]
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center custom-heading">Admin Dashboard</h2>
            {/* Summary Cards */}
            <div className="row text-center mb-1">
                <div className="col-md-4">
                    <div className="card shadow-sm p-2">
                        <h4>Users</h4>
                        <p className="fs-3 fw-bold text-primary">{stats.users}</p>
                    </div>
                </div>
                <div className="col-md-4 mb-1">
                    <div className="card shadow-sm p-2">
                        <h4>Recipes</h4>
                        <p className="fs-3 fw-bold text-success">{stats.recipes}</p>
                    </div>
                </div>
                <div className="col-md-4 mb-1">
                    <div className="card shadow-sm p-2">
                        <h4>Total Comments</h4>
                        <p className="fs-3 fw-bold text-danger">{stats.totalComments}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="row mb-1">
                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">Top Recipes (by Comments)</h5>
                        <Bar data={topCommentedRecipesData} />
                    </div>
                </div>

                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">Top Users (by Recipes)</h5>
                        <Bar data={topUsersData} />
                    </div>
                </div>

                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">Top Recipes (by Rating)</h5>
                        <Bar data={topRatedRecipesData} />
                    </div>
                </div>
            </div>

            <div className="row mb-1">
                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">User Distribution</h5>
                        <Pie data={userDistributionData} />
                    </div>
                </div>

                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">Top Tags</h5>
                        <Pie data={topTagsData} />
                    </div>
                </div>
                <div className="col-md-4 mb-1">
                    <div className="card p-4 shadow">
                        <h5 className="text-center">Top Users by Comments</h5>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>User Name</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.topCommenters.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`${config.BASE_URL}/${user.profilePicture}`} alt="Profile" width="40" height="40" className="rounded-circle" />
                                        </td>
                                        <td>{user.userName}</td>
                                        <td>{user.totalComments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;