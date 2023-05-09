import React from "react";
import jobs from "../jobs.json";
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ScienceIcon from "@mui/icons-material/Science";
import WalletIcon from "@mui/icons-material/Wallet";
import { format } from "date-fns";

function DetailPage() {
  const params = useParams();
  const jobId = params.id;
  const job = jobs.find((job) => job.id === jobId);

  const skillSet = job.skills;
  const formattedDate = format(new Date(job.postedDate), "MMM-do, yyyy");

  if (!job)
    return (
      <Typography variant="h3" marginTop={3}>
        No job matched
      </Typography>
    );

  return (
    <Container sx={{ width: 900 }}>
      <Typography variant="h3" marginTop={3}>
        {job.title}
      </Typography>
      <Divider />
      <Box display="flex" alignItems="center" marginTop={1}>
        <WalletIcon />
        <Typography variant="subtitile2" paddingLeft={1}>
          {job.salaryLow} - {job.salaryHigh} $
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop={1}>
        <EditIcon />
        <Typography variant="subtitile2" paddingLeft={1}>
          Posted Date: {formattedDate}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop={1}>
        <LocationCityIcon />
        <Typography variant="subtitile2" paddingLeft={1}>
          Working Location: {job.city}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop={1}>
        <ScienceIcon />
        <Typography variant="subtitile2" paddingLeft={1}>
          Experience: {job.yrsXPExpected} years
        </Typography>
      </Box>
      <Divider />

      <Typography variant="body1" marginTop={2} marginBottom={2}>
        {job.description}
      </Typography>
      <Divider />
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        marginTop={3}
      >
        {skillSet.map((skill, index) => (
          <Chip key={index} label={skill} color="secondary" clickable />
        ))}
      </Stack>

      <Box marginTop={3}>
        {job.remote ? (
          <Chip label="Remote working" variant="outlined" color="success" />
        ) : (
          <Chip label="Remote working" variant="outlined" color="error" />
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
