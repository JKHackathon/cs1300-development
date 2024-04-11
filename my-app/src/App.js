import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import recipeData from "./assets/recipe-data.json";
import RecipeItem from "./components/RecipeItem";
import { Button, ButtonGroup, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

function App() {
  // const [saved, setSaved] = useState(new Map());
  const [saved, setSaved] = useState(new Set());
  const [tabId, setTabId] = useState(0);
  const [doSort, setDoSort] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [starFilter, setStarFilter] = useState("");

  const changeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const changeStarFilter = (event) => {
    setStarFilter(event.target.value);
  };

  const changeSort = (event) => {
    setDoSort(event.target.value);
  };

  const reset = () => {
    setTypeFilter("");
    setStarFilter("");
    setDoSort("");
  };

  const ShowcaseRecipes = () => {
    if (tabId == 1) return;
    // console.log(jsxList);
    let filteredList = jsxList;
    if (typeFilter != "") {
      filteredList = filteredList.filter((item) => {
        return item.props.type === typeFilter;
      });
    }

    if (starFilter != "") {
      filteredList = filteredList.filter((item) => {
        return item.props.rating === starFilter;
      });
    }

    if (doSort) {
      filteredList = filteredList.sort((item1, item2) => {
        return item1.props.time > item2.props.time;
      });
    }

    if (!filteredList.length) {
      return <p>No results</p>;
    }

    return filteredList;
  };

  // const displaySaved = () => {
  //   if (tabId == 0) return;
  //   const savedItemsList = [];
  //   saved.forEach((val, key) => {
  //     savedItemsList.push(val);
  //   });
  //   console.log(savedItemsList);
  //   return savedItemsList;
  // };
  const displaySaved = () => {
    if (tabId == 0) return;

    let filteredList = jsxList.filter((item) => {
      return saved.has(item.props.id);
    });

    if (typeFilter != "") {
      filteredList = filteredList.filter((item) => {
        return item.props.type === typeFilter;
      });
    }

    if (starFilter != "") {
      filteredList = filteredList.filter((item) => {
        return item.props.rating === starFilter;
      });
    }

    if (doSort) {
      filteredList = filteredList.sort((item1, item2) => {
        return item1.props.time > item2.props.time;
      });
    }

    if (!filteredList.length) {
      return <p>No results</p>;
    }

    return filteredList;
  };

  const saveItem = (id) => {
    // saved.add(id);
    setSaved((saved) => {
      return new Set([...saved, id]);
    });
  };

  const unsaveItem = (id) => {
    setSaved((saved) => {
      saved.delete(id);
      return new Set(saved);
    });
  };

  const jsxList = recipeData.map((item, index) => (
    <RecipeItem
      id={index}
      name={item.name}
      source={item.source}
      description={item.description}
      type={item.type}
      imagePath={item.image}
      time={item.time}
      rating={item.rating}
      saveItem={saveItem}
      unsaveItem={unsaveItem}
      saved={saved}
    ></RecipeItem>
  ));

  // const saveItem = (id, item) => {
  //   saved.set(id, item);
  //   setSaved(new Map(saved));
  // };

  // const unsaveItem = (id) => {
  //   saved.delete(id);
  //   setSaved(new Map(saved));
  // };

  const handleTabSwitch = (_, newTabId) => {
    setTabId(newTabId);
  };

  return (
    <div className="App">
      <h1 style={{ marginLeft: 30 }}>Recipes For College Students</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabId} onChange={handleTabSwitch}>
          <Tab label="All recipes" />
          <Tab label="Saved Recipes" />
        </Tabs>
      </Box>
      <ButtonGroup>
        <FormControl sx={{ minWidth: 120, margin: 3 }}>
          <InputLabel id="sort-by">Sort By</InputLabel>
          <Select
            labelId="sort-by"
            value={doSort ? "Sort by time" : ""}
            label="Stars"
            onChange={changeSort}
          >
            <MenuItem value={true}>Time</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, margin: 3 }}>
          <InputLabel id="type-filter">Type</InputLabel>
          <Select
            labelId="type-filter"
            value={typeFilter}
            label="Type"
            onChange={changeTypeFilter}
          >
            <MenuItem value={"breakfast"}>breakfast</MenuItem>
            <MenuItem value={"lunch"}>lunch</MenuItem>
            <MenuItem value={"dinner"}>dinner</MenuItem>
            <MenuItem value={"side"}>side</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, margin: 3 }}>
          <InputLabel id="star-filter">Stars</InputLabel>
          <Select
            labelId="star-filter"
            value={starFilter}
            label="Stars"
            onChange={changeStarFilter}
          >
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Stars</MenuItem>
            <MenuItem value={3}>3 Stars</MenuItem>
            <MenuItem value={4}>4 Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ textTransform: "none", margin: 3 }}
          size="small"
          variant="outlined"
          onClick={() => reset()}
        >
          Reset Filters
        </Button>
      </ButtonGroup>
      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {ShowcaseRecipes()}
        {displaySaved()}
      </Container>
    </div>
  );
}

export default App;
