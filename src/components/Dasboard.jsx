import React from "react";

export default function Dashboard() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImg: "https://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(function () {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getImage() {
    const randomNo = Math.floor(Math.random() * allMemes.length + 1);
    const url = allMemes[randomNo].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: url,
    }));
  }

  return (
    <main className="flex items-center bg-gray-500 p-6">
      <div className="flex gap-2 items-center">
        <div className=" text-xl font-semibold">
          <input
            type="text"
            className=" w-[200px] h-[40px] border-black border-2 mr-6 text-center rounded-full active:border-black active:border-2  "
            placeholder="Enter top text"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
          <input
            type="text"
            className="w-[200px] h-[40px] border-black border-2 mr-6 text-center rounded-full  active:border-black active:border-2 md: mt-6"
            placeholder="Enter Bottom text"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </div>
        <button
          className="w-auto h-auto border-dashed border boder-2"
          onClick={getImage}
        >
          Get a New Neme Image
        </button>
        <div className="w-[800px] h-[800px] p-4 grid grid-rows-2 text-2xl font-bold">
          <img
            className="object-contain w-full h-full rounded-2xl"
            src={meme.randomImg}
            alt="Meme Image"
          />
          <h2 className="absolute top-4 left-[950px] ">{meme.topText}</h2>
          <h2 className="absolute bottom-[240px] left-[900px] ">
            {meme.bottomText}
          </h2>
        </div>
      </div>
    </main>
  );
}
