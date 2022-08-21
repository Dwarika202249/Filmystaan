import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {img_300, noPicture} from "../../config/config";
import "./contentmodal.css";

const style = {
  width: "60%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState();
  const [video, setVideo] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(`
        https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `);
    console.log(data);
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(`
        https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `);
    setVideo(data.results[0]?.key);
  };


  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Box sx={style}>
            {content && <Typography id="transition-modal-title" variant="h3" component="h2" style={{color: "#001641"}} className="movieTitle">
              {content.title}
            </Typography>}
            {content && <Typography id="transition-modal-title" variant="h6" component="h2" className="movieTag">
              {content.tagline}
            </Typography>}
            {content && <Typography style={{color: "GrayText", fontSize: "14px"}}id="transition-modal-title"
            className="movieDesc"
            >
              {content.overview}
            </Typography>}
            <Button target="__blank" href={`https://www.youtube.com/watch?v=${video}`}>
              {content && <img className="imgPoster" src={content.poster_path ? `${img_300}/${content.poster_path}` : noPicture} alt={content.title} />}
                <Typography id="transition-modal-description" className="trailerText" sx={{ mt: 2 }}>
              Watch Trailer
            </Typography>
                 </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
