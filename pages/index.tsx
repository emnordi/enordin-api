import type { NextPage } from "next";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        F1 API
      </Grid>
    </Container>
  );
};

export default Home;
