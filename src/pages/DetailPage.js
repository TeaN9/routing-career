import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  CircularProgress,
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
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = "http://localhost:7000/jobs/"; // json-server --port 7000
        const url = baseUrl + jobId;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setJobDetail(data);
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
  }, [jobId]);

  const skillSet = jobDetail ? jobDetail.skills : [];
  const formattedDate = jobDetail
    ? format(new Date(jobDetail.postedDate), "MMM-do, yyyy")
    : "";

  return (
    <>
      {loading ? (
        <Box>
          <CircularProgress size="md" value={25} />
        </Box>
      ) : errorMessage ? (
        <Box>
          <Typography level="h2">{errorMessage}</Typography>
        </Box>
      ) : (
        <Container sx={{ maxWidth: "600px" }}>
          <Typography variant="h3" marginTop={3}>
            {jobDetail?.title}
          </Typography>
          <Divider />
          <Box display="flex" alignItems="center" marginTop={1}>
            <WalletIcon />
            <Typography variant="subtitile2" paddingLeft={1}>
              {jobDetail?.salaryLow} - {jobDetail?.salaryHigh} $
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
              Working Location: {jobDetail?.city}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" marginTop={1}>
            <ScienceIcon />
            <Typography variant="subtitile2" paddingLeft={1}>
              Experience: {jobDetail?.yrsXPExpected} years
            </Typography>
          </Box>
          <Divider />

          <Typography
            variant="body1"
            marginTop={2}
            marginBottom={2}
            textAlign="justify"
          >
            {jobDetail?.description}
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
            {jobDetail?.remote ? (
              <Chip label="Remote working" variant="outlined" color="success" />
            ) : (
              <Chip label="Remote working" variant="outlined" color="error" />
            )}
          </Box>
        </Container>
      )}
    </>
  );
}

export default DetailPage;
