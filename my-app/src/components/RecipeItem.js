import "./RecipeItem.css";
import { CardMedia, Hidden } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function DisplaysItem(props) {
  //   const [isSaved, setIsSaved] = useState(false);
  const [savedAlertOpen, setSavedAlertOpen] = useState(false);
  const saved = props.isSaved;

  const displayTime = () => {
    const hrs = Math.floor(props.time / 60);
    const minutes = props.time % 60;
    const hrsString = hrs === 1 ? "1 hr" : hrs + " hrs";
    const minsString = minutes ? minutes + " mins" : "";
    const timeString = hrs ? hrsString + " " + minsString : minsString;
    return <p>{timeString}</p>;
  };

  const displayRating = () => {
    return props.rating == -1 ? (
      <p style={{ color: "gray" }}>No ratings</p>
    ) : (
      <Rating value={props.rating} precision={0.5} readOnly size="small" />
    );
  };

  const flipSaved = () => {
    if (!props.saved.has(props.id)) {
      props.saveItem(props.id, recipeCard);
      console.log("item saved");
    } else {
      props.unsaveItem(props.id);
      console.log("item unsaved");
    }
    // setIsSaved(!props.isSaved);
    console.log("alert opened");
    setSavedAlertOpen((val) => {
      return true;
    });
  };

  const closeAlert = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    console.log("alert closed");
    setSavedAlertOpen((val) => {
      return false;
    });
  };

  const recipeCard = (
    <Card sx={{ width: 400, maxHeight: 500, margin: 1 }}>
      {/* <CardActionArea> */}
      <CardMedia sx={{ height: 200 }} image={props.imagePath} />
      <CardContent>
        <div class="tag">
          <p style={{margin: 0}}><strong>{props.type}</strong></p>
        </div>
        <h2 style={{margin:1}}>{props.name}</h2>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {displayTime()}
          {displayRating()}
          <Button
            variant="contained"
            endIcon={props.saved.has(props.id) ? "" : <BookmarkIcon />}
            onClick={() => flipSaved()}
          >
            {props.saved.has(props.id) ? "Unsave" : "Save"}
          </Button>
        </Box>
        <p style={{ textOverflow: "ellipsis" }}>{props.description}</p>
        <Snackbar
          disableWindowBlurListener
          open={savedAlertOpen}
          autoHideDuration={3000}
          onClose={closeAlert}
          message={
            props.saved.has(props.id) ? "Recipe saved." : "Recipe unsaved"
          }
          sx={{ color: "blue" }}
        />
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );

  // Use mui snackbar as notification when recipe saved or unsaved
  // Use mui card?
  return recipeCard;
}
