import { Box, Container, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import JobCard from "../components/JobCard";
import jobs from "../jobs.json";

function HomePage() {
  const [page, setPage] = useState(1);
  const elementsPerPage = 5; // Display 5 elements per page
  const numPages = Math.ceil(jobs.length / elementsPerPage);

  const handleClick = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const displayedJobs = jobs.slice(startIndex, endIndex);

  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 1, mb: 3, alignItems: "stretch" }}>
        {displayedJobs.map((job) => (
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
  );
}

export default HomePage;
