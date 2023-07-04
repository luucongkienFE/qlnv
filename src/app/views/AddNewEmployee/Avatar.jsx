import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    width:"100%"
  },
  avatar: {
    width: "100%",
    height: theme.spacing(26),
  },
  input: {
    display: "none",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

function CustomAvatarEditor(props) {
  const {setImgSrc}=props
  const itemRowdata = useSelector(state => state.employee)
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(itemRowdata.photoUrl);
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(()=>{
    setImgSrc(image)

  },[image])

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar} src={image} />
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleInputChange}
        />
        <label htmlFor="icon-button-file">
          <Button color="primary" component="span" startIcon={<CameraAltIcon />} style={{padding:"15px 50px 0"}}>
            Chọn ảnh
          </Button>
        </label>
      </div>
    </Container>
  );
}

export default CustomAvatarEditor;
