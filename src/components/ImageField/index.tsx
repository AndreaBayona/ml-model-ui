import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import {getLive, predictCovid} from "../../services";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CircularProgress from "@mui/material/CircularProgress";

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme();

export const ImageField: React.FC = () => {
  const [img, setImg] = React.useState<File | null>();
  const [url, setUrl] = React.useState<string[]>([]);
  const [response, setResponse] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  console.log(img)

  React.useEffect(() => {
    if(!img) return;

    setResponse("");
    const urls = []
    urls.push(URL.createObjectURL(img))
    setUrl(urls)

  }, [img])

  const handleSubmit = async () => {
    if (!img) return;
     try {
       setLoading(true);
       const formData = new FormData();
       formData.append("image", img);

       const res = await predictCovid(formData);
       console.log(res)
       setResponse(res.response)
       setLoading(false);
    }
    catch (e) {
      console.error(e)
      setLoading(false);
      setResponse("Error processing the request");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: "center",
          columnGap: "20px"
      }}>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '400px'
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <SettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Paso 1: Seleccionar imagen
            </Typography>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => setImg(event.target.files ? event.target.files[0]: null)}/>
              <IconButton color="primary" aria-label="upload picture" component="span" sx={{ mt: 3, mb: 2 }}>
                <PhotoCamera />
              </IconButton>
            </label>
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '400px'
            }}
          >
            {url.length > 0 && <img src={url[0]} width={500}/>}
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '400px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LightbulbIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Paso 2: Predecir
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={!img || response !== ""}
          >
            Predict
          </Button>
          {response !== "" &&
              <Typography component="div" variant="body1">
                {response}
              </Typography> }
          {loading && <CircularProgress />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
