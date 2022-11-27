import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import likedLogo from "../assets/likedLogo.png";
import { useState, useEffect } from "react";

const MySongs = () => {
  const [songs, setSongs] = useState([]);

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pl-72 w-full h-full flex flex-col bg-gray-900">
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
                <button class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
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
