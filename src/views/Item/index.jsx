import React from "react";
import Header from "../../components/header";
import SearchBox from "../../components/SearchBox";
import Container from "@material-ui/core/Container";
import fetch from "node-fetch";
import { withRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  picContent: {
    textAlign: "center",
  },
  pic: {
    width: "auto",
    height: "100%",
    maxHeight: "700px",
  },
  price: {
    "& span": {
      fontSize: "15px",
      position: "absolute",
      padding: 5,
    },
  },
  description: {
    textAlign: "left",
  },
}));

const Item = ({ items: { item }, router, search }) => {
  const {
    id,
    title,
    price,
    picture,
    condition,
    free_shipping,
    sold_quantity,
    description,
  } = item;
  const classes = useStyles();
  const handleSearch = (search) => {
    router.push({
      pathname: "/items",
      query: { search },
    });
  };

  return (
    <>
      <Header>
        <SearchBox handleSearch={handleSearch} value={search} />
      </Header>
      <Container>
        <Box component="div" mt={2} mb={2}>
          {id}
        </Box>
        <Paper elevation={0}>
          <Box
            component="div"
            p={4}
            borderColor="grey.100"
            border={1}
            borderBottom={0}
          >
            <Grid container spacing={4}>
              <Grid item xs={9} className={classes.picContent}>
                <img className={classes.pic} src={picture} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {condition} - {sold_quantity} vendidos
                </Typography>
                <Typography
                  variant="h5"
                  className={classes.location}
                  gutterBottom
                  component={"h1"}
                >
                  {title}
                </Typography>

                <Box component="div" pt={2} pb={2}>
                  <Typography
                    variant="h4"
                    className={classes.price}
                    gutterBottom
                  >
                    $ {price.amount}{" "}
                    <Box component="span">{price.decimals}</Box>
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth color="secondary">
                  Comprar
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.description}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component={"h2"}
                  pt={2}
                  pb={2}
                >
                  Descripción del producto
                </Typography>

                <Box component="div" pr={10}>
                  <Typography variant="body1" gutterBottom component={"p"}>
                    {description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

Item.getInitialProps = async ({ query }) => {
  const { id } = query;
  const res = await fetch(`http://localhost:3000/api/items/${id}`);
  const items = await res.json();
  return { items };
};

export default withRouter(Item);
