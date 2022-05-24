import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import {getLive, predictCovid} from "../../services";
import Button from "@mui/material/Button";

const Input = styled('input')({
  display: 'none',
});

export const ImageField: React.FC = () => {
  const [img, setImg] = React.useState<File | null>();
  const [url, setUrl] = React.useState<string[]>([]);
  const [response, setResponse] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  console.log(img)

  React.useEffect(() => {
    if(!img) return;

    const urls = []
    urls.push(URL.createObjectURL(img))
    setUrl(urls)

  }, [img])

  const handleSubmit = async () => {
    if (!img) return;
     try {
       const formData = new FormData();
       formData.append("image", img);
      console.log(formData)
      setLoading(true);
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
    <Stack direction="row" alignItems="center" spacing={2}>
      <div>Respuesta {response}</div>
      {url.length > 0 && <img src={url[0]} height={500}/>}
      {/*</label>*/}
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => setImg(event.target.files ? event.target.files[0]: null)}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Predict
      </Button>
    </Stack>
  );
}
