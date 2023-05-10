import { Box, Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [jobs, setJobs] = useState(null);
  const [page, setPage] = useState(1);

  const elementsPerPage = 20;
  const numPages = Math.ceil(jobs.length / elementsPerPage);

  const handleClick = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const displayedJobs = jobs.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:7000/jobs"; // json-server --port 7000
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  return (
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
      <Outlet />
    </>
  );
}

export default HomePage;
