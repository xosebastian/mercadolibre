import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../components/Link";

const useStyles = makeStyles(() => ({
  logo: {
    verticalAlign: "text-top",
  },
}));

export default function Header({ children }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Container justify="space-between">
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Link href="/">
                <Typography variant="h6" noWrap>
                  <img className={classes.logo} src="/images/Logo_ML.png" />
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={11}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
