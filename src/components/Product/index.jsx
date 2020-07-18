import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  pic: {
    width: "100%",
    height: "100%",
  },
  link: {
    fontWeight: "normal",
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  title: {
    fontWeight: 400,
  },
  location: {
    fontWeight: 400,
    float: 'right',
  },
}));

export default function Product({product, categories}) {
  const {
    id,
    picture,
    title,
    price,
    condition,
    address,
    free_shipping,
  } = product;
  const classes = useStyles();

  return (
    <Box
      p={3}
      borderColor="grey.100"
      border={1}
      borderTop={0}
      borderLeft={0}
      borderRight={0}
    >
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Link href={`/items/${id}`} naked className={classes.link} categories={categories}>
            <img className={classes.pic} src={picture} />
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Typography variant="h5" gutterBottom component={"span"}>
                {price.currency == "ARS" && "$"} {price.amount}{" "}
                {free_shipping && <img src={"/images/ic_shipping.png"} />}
              </Typography>
              <Link href={`/items/${id}`} naked className={classes.link}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.title}
                  component={"h2"}
                >
                  {title}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" className={classes.location} gutterBottom>
                {address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
