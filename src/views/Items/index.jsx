import React from "react";
import Header from "../../components/header";
import SearchBox from "../../components/SearchBox";
import Container from "@material-ui/core/Container";
import fetch from "node-fetch";
import { withRouter } from "next/router";
import Product from "../../components/Product";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentCategoy: {
    "& h1 span": {
      "&::after": {
        content: '"❯"',
        height: 60,
        padding: theme.spacing(1),
      },
    },
    "& h1 span:last-child": {
      "&::after": {
        display: "none",
      },
    },
  },
  category: {
    display: "inline-block",
    color: theme.palette.text.primary,
  },
}));

const Items = ({ items, router, search }) => {
  const { products, categories } = items;
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
        <Box component="div" className={classes.contentCategoy} mt={2} mb={2}>
          <Typography
            variant="body2"
            className={classes.category}
            component={"h1"}
          >
            {categories &&
              categories.map((category) => (
                <Typography
                  key={category}
                  variant="body2"
                  className={classes.category}
                  component={"span"}
                >
                  {category}
                </Typography>
              ))}
          </Typography>
        </Box>
        <Box component="div" borderColor="grey.100" border={1} borderBottom={0}>
          <Paper elevation={0}>
            {products &&
              products.map((product, i) => (
                <Product key={i} product={product} categories={categories} />
              ))}
          </Paper>
        </Box>
      </Container>
    </>
  );
};

Items.getInitialProps = async ({ query }) => {
  const { search } = query;
  const res = await fetch(`http://localhost:3000/api/items?q=${search}`);
  const items = await res.json();
  return { items, search };
};

export default withRouter(Items);
