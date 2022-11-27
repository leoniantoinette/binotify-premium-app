import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import likedLogo from "../assets/likedLogo.png";

const SongDetail = () => {
  const { songId } = useParams();

  const [songDetail, setSongDetail] = useState();
  const [songTitle, setSongTitle] = useState();

  //TODO: get user_id from cookie
  useEffect(() => {
    async function getSongDetail() {
      await axios
        .get(`http://localhost:3001/user/10/songs/${songId}`)
        .then((response) => {
          setSongDetail(response.data);
          console.log("response data :", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getSongDetail();
  }, []);

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
            </div>
          </div>
        </div>
        <div className="h-3/5 pt-10 pl-8">
          <form action="POST">
            <div className="flex flex-col ">
              <label
                for="JudulLagu"
                className="text-gray-100 text-sm font-bold tracking-normal mb-2"
              >
                Email
              </label>
              <input
                id="JudulLagu"
                className=" bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                value={songDetail && songDetail[0].Judul}
              />
            </div>
            <div className="flex flex-col pt-4 ">
              <label
                for="audioFile"
                className="text-gray-100 text-sm font-bold tracking-normal mb-2"
              >
                Audio File
              </label>
              <input id="audioFile" type="file" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
