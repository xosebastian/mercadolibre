import React from "react";
import Header from "../../components/header";
import SearchBox from "../../components/SearchBox";
import { withRouter } from "next/router";

const Home = ({ router }) => {
  const handleSearch = (search) => {
    router.push({
      pathname: "/items",
      query: { search },
    });
  };

  return (
    <>
      <Header>
        <SearchBox handleSearch={handleSearch} />
      </Header>
    </>
  );
};

export default withRouter(Home);
