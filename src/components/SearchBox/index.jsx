import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: "2px 0px 0px 2px",
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    borderRadius: 0,
    backgroundColor: theme.palette.common.grey.light,
    color: theme.palette.text.primary,
    borderRadius: "0px 2px 2px 0px",
    "&:hover": {
      backgroundColor: theme.palette.common.grey.light,
    },
  },
  inputRoot: {
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    width: "100%",
  },
}));

export default function SearchBox({handleSearch, value}) {

  const [querySearch, setQuerySearch] = useState(value || '');   
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={10}>
        <div className={classes.search}>
          <InputBase
            placeholder="Nunca dejes de buscar"
            value = {querySearch}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => setQuerySearch(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Grid>

      <Grid item xs={2}>
        <IconButton
          disableFocusRipple
          disableRipple
          variant="contained"
          aria-label="delete"
          className={classes.searchIcon}
          onClick={() => handleSearch(querySearch)}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
