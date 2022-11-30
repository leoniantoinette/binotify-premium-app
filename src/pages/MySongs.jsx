import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import likedLogo from "../assets/likedLogo.png";
import { useState, useEffect } from "react";

const MySongs = () => {
  const [songs, setSongs] = useState([]);
  const [songTitle, setSongTitle] = useState();
  const [showModal, setShowModal] = React.useState(false);
  const PHP_PATH = "http://localhost:8080/src/php/song/editPremiumSong.php";
  const [idUser, setId] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    try {
      axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          setId(response.data.user[0].user_id);
          console.log("id", idUser);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3001/user/10/songs")
        .then((response) => {
          setSongs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const handleSongTitleChange = (e) => {
    setSongTitle(e.target.value);
    console.log("songTitle", songTitle);
  };

  // TODO: get user_id from cookie
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    const file = document.getElementById("audioFile").files[0];
    const filename = document.getElementById("audioFile").files[0].name;
    const userId = idUser;
    console.log("filename =", filename);
    console.log("userId =", userId);
    const formData = new FormData();
    formData.append("audiofile", file);
    formData.append("title", songTitle);
    formData.append("user_id", userId);
    console.log("formData", formData);
    try {
      // upload file
      axios
        .post(PHP_PATH, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        });

      // TODO: get song path from php
      let path_dir_audio = "assets/PremiumSong/" + idUser + filename;
      console.log("path_dir_audio", path_dir_audio);

      // insert to database
      axios
        .post("http://localhost:3001/user/10/songs", {
          title: songTitle,
          audio_path: path_dir_audio,
        })
        .then((response) => {
          console.log(response);
        });

      // refresh page
      // window.location.reload();
      navigate("/MySongs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pl-72 w-full h-full flex flex-col bg-gray-900">
        <>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Create Song</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form
                        action=""
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                      >
                        <label
                          for="JudulLagu"
                          className="text-gray-800 text-sm font-bold tracking-normal mb-2"
                        >
                          Judul Lagu
                        </label>
                        <input
                          id="JudulLagu"
                          className=" bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                          onChange={handleSongTitleChange}
                        />

                        <label
                          for="audioFile"
                          className="text-gray-800 text-sm font-bold tracking-normal mb-2"
                        >
                          Audio File
                        </label>
                        <input
                          id="audioFile"
                          className=" bg-white font-normal w-64 h-10 flex items-center pl-3 pb-8 text-sm border-gray-300 rounded border shadow"
                          type="file"
                        />
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>

        <div className="h-2/5 text-4xl font-bold p-4 bg-gradient-to-b from-violet-500 to-gray-900 ">
          <div className="flex flex-row gap-5 pt-4 pl-4 ">
            <img src={likedLogo} className="w-1/5" alt="" />
            <div className="pt-8">
              <p className="text-sm font-light tracking-widest text-white">
                PLAYLIST
              </p>
              
              <h1 className="text-white font-bold text-7xl">My Songs</h1>
            </div>
          </div>
        </div>

        <div class="w-full min-h-screen sm:px-6">
          <div class="px-4 md:px-10 py-3 bg-gray-100 dark:bg-gray-900 rounded-tl-lg rounded-tr-lg">
            <div class="sm:flex items-center justify-between">
              <p
                tabIndex="0"
                class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white "
              >
                # Songs
              </p>
              <div>
                <button
                  class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                  onClick={() => setShowModal(true)}
                >
                  <p class="text-sm font-medium leading-none text-white">
                    Create Song
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-900  shadow md:px-10 pt-4 md:pt-3 pb-5 overflow-y-auto">
            <table class="w-full whitespace-nowrap">
              <thead>
                <tr
                  tabIndex="0"
                  class="focus:outline-none h-10 w-full text-sm leading-none text-gray-800 dark:text-white "
                >
                  <th class="font-normal text-left pl-4">Title</th>
                </tr>
              </thead>
              <tbody class="w-full">
                {songs.map((song, index) => (
                  <tr
                    tabIndex="0"
                    key={index}
                    class="focus:outline-none h-20 text-sm leading-none text-gray-800 dark:text-white  bg-white dark:bg-gray-900  hover:bg-gray-100 dark:hover:bg-gray-800  border-b border-t border-gray-100 dark:border-gray-700 "
                  >
                    <Link to={`/songs/${song.song_id}`}>
                      <td class="pl-4 cursor-pointer">
                        <div class="flex items-center">
                          <div class="w-10 h-10">
                            <img
                              class="w-full h-full"
                              src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                              alt="UX Design and Visual Strategy"
                            />
                          </div>
                          <div class="pl-4">
                            <p class="font-medium">{song.Judul}</p>
                            <p class="text-xs leading-3 text-gray-600 dark:text-gray-200  pt-2">
                              Herman Group
                            </p>
                          </div>
                        </div>
                      </td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySongs;
