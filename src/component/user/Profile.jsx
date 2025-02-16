import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import { useForm } from "react-hook-form";
import avtarImage from "../img/person2.png";
import { Loader } from "../Loader";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const id = localStorage.getItem("id");
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/users/user/${id}`);
        if (res.data?.data) {
          setUserData(res.data.data);
          setValue("name", res.data.data.name);
          setValue("contact", res.data.data.contact);
          setValue("email", res.data.data.email);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        alert("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/users/user/${id}`,
        data
      );
      if (res.status === 200) {
        setUserData(res.data.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Loader />
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 5,
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* Profile Title */}
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#333",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Your Profile
              </Typography>
            </Grid>

            {/* Profile Avatar & Name */}
            <Grid item xs={12} sm={5}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Avatar
                  src={avtarImage}
                  sx={{
                    width: { xs: 100, sm: 130 },
                    height: { xs: 100, sm: 130 },
                    mb: 2,
                    border: "4px solid white",
                    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    letterSpacing: "0.5px",
                    textTransform: "capitalize",
                  }}
                >
                  {userData?.name}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={7}
              sx={{
                p: 3,
              }}
            >
              {isEditing ? (
                <form onSubmit={handleSubmit(submitHandler)}>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      {...register("name")}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Contact"
                      {...register("contact")}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      {...register("email")}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              ) : (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
                  >
                    Username:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {userData?.name}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
                  >
                    Contact:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {userData?.contact}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
                  >
                    Email:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {userData?.email}
                    </span>
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    borderRadius: 20,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Social Links */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Connect Your Socials ❤️
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon />}
                sx={{ borderRadius: 20 }}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                color="info"
                startIcon={<TwitterIcon />}
                sx={{ borderRadius: 20 }}
              >
                Twitter
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<InstagramIcon />}
                sx={{
                  borderRadius: 20,
                  background:
                    "linear-gradient(45deg, #833AB4, #C13584, #E1306C, #FD1D1D)",
                }}
              >
                Instagram
              </Button>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary">
              © 2024 Urban Services. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Terms of Service | Privacy Policy
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default UserProfile;
