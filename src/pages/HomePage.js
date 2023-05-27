import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Outlet } from "react-router-dom";
import { useAuthenticationContext } from "../context/Auth";

function HomePage() {
  const [jobs, setJobs] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const elementsPerPage = 12;

  const { openModal, handleCloseModal } = useAuthenticationContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "http://localhost:7000/jobs"; // json-server --port 7000
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setJobs(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const numPages = jobs ? Math.ceil(jobs.length / elementsPerPage) : 0;

  const handleClick = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const displayedJobs = jobs ? jobs.slice(startIndex, endIndex) : [];

  return (
    <>
      {loading ? (
        <Box>
          <CircularProgress size="lg" value={25} />
        </Box>
      ) : errorMessage ? (
        <Box>
          <Typography level="h2">{errorMessage}</Typography>
        </Box>
      ) : (
        <>
          <Container>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1, mb: 3, alignItems: "stretch" }}
            >
              {jobs &&
                displayedJobs.map((job) => (
                  <Grid item key={job.id} xs={12} md={6} lg={4}>
                    <JobCard key={job.id} job={job} />
                  </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" marginBottom={3}>
              <Pagination
                count={numPages}
                color="secondary"
                shape="rounded"
                page={page}
                onChange={handleClick}
              />
            </Box>
          </Container>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxwidth: 800,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 2,
              }}
            >
              <Outlet />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default HomePage;
