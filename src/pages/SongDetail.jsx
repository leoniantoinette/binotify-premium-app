import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import likedLogo from "../assets/likedLogo.png";

const SongDetail = () => {
  const { songId } = useParams();
  const API_PATH = "http://localhost:8080/src/php/song/editPremiumSong.php";
  const [songDetail, setSongDetail] = useState();
  const [songTitle, setSongTitle] = useState();
  const navigate = useNavigate();

  //TODO: get user_id from cookie
  useEffect(() => {
    async function getSongDetail() {
      await axios
        .get(`http://localhost:3001/user/10/songs/${songId}`)
        .then((response) => {
          setSongDetail(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getSongDetail();
  }, [songId]);

  const handleSongTitleChange = (e) => {
    setSongTitle(e.target.value);
    console.log("songTitle", songTitle);
  };

  const handleSongTitleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked", songTitle);
    try {
      axios.put(
        `http://localhost:3001/user/10/songs/title/${songId}`,
        {
          title: songTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // handle audio file change to localhost:8080 php
  const handleAudioFileChange = (e) => {
    const file = document.getElementById("audioFile").files[0];
    const formData = new FormData();
    formData.append("audiofile", file);
    formData.append("song_id", songId);
    formData.append("title", songTitle[0].Judul);
    console.log("formData", formData);
    try {
      axios.post(API_PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete song
  // TODO: get user_id from session
  const handleDeleteSong = (e) => {
    e.preventDefault();
    try {
      axios.delete(`http://localhost:3001/user/10/songs/${songId}`);
    } catch (error) {
      console.log(error);
    }

    // navigate to home
    navigate("/MySongs");
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="pl-72 bg-gray-900 h-full w-full">
        <div className="h-2/5 text-4xl font-bold p-4 bg-gradient-to-b from-violet-500 to-gray-900 ">
          <div className="flex flex-row gap-5 pt-4 pl-4 ">
            <img src={likedLogo} className="w-1/5" alt="" />
            <div className="pt-8">
              <p className="text-sm font-light tracking-widest text-white">
                EDIT SONG
              </p>
              {songDetail && (
                <h1 className="text-white font-bold text-7xl">
                  {songDetail[0].Judul}
                </h1>
              )}

              <button
                class="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 inline-flex mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded"
                onClick={handleDeleteSong}
              >
                <p class="text-sm font-medium leading-none text-white">
                  Delete Song
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="h-3/5 pt-10 pl-8">
          <div className="flex flex-col ">
            <form action="" onSubmit={(e) => handleSongTitleSubmit(e)}>
              <label
                for="JudulLagu"
                className="text-gray-100 text-sm font-bold tracking-normal mb-2"
              >
                Judul Lagu
              </label>
              <input
                id="JudulLagu"
                className=" bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                value={songTitle}
                onChange={(e) => handleSongTitleChange(e)}
              />
              <button type="submit" className="text-white text-xl">
                Save
              </button>
            </form>
          </div>

          <div className="flex flex-col pt-4 ">
            <form
              action=""
              onSubmit={(e) => handleAudioFileChange(e)}
              encType="multipart/form-data"
            >
              <label
                for="audioFile"
                className="text-gray-100 text-sm font-bold tracking-normal mb-2"
              >
                Audio File
              </label>
              <input id="audioFile" type="file" />
              <button className="text-white text-xl" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
