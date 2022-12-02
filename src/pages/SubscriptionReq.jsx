import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";


class SubscriptionReq extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      listSubscription: [],
      loading: null,
      postsPerPage: 10
    };
    
  }

  // fetch data
  componentDidMount() {
    this.setState({ loading: true });
    axios.get("http://localhost:3001/api/list-subscription").then((response) => {
      this.setState({ listSubscription: response.data });
      this.setState({ loading: false });
    });
  }

  render() {
    const logout = () => {
      localStorage.removeItem("user");
      localStorage.clear();
      window.location.reload();
      window.location.href = "http://localhost:3000/login";
    };
    // get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.listSubscription.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(this.state.listSubscription.length / this.state.postsPerPage); i++) {
      pageNumbers.push(i);
    }

    // set current page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    const handleApprove = (creatorID, subscriberID) => {
      console.log("approve creatorID: " + creatorID + " subscriberID: " + subscriberID);
      axios.post("http://localhost:3001/approve-subscription", {
        creatorID: creatorID,
        subscriberID: subscriberID
      }).then((response) => {
        console.log(response.data)
        if (response.data) {
          alert("Subscription approval successful");
          window.location.reload();
        } else {
          alert("Subscription approval failed");
        }
      });
    }

    const handleReject = (creatorID, subscriberID) => {
      console.log("reject creatorID: " + creatorID + " subscriberID: " + subscriberID);
      axios.post("http://localhost:3001/reject-subscription", {
        creatorID: creatorID,
        subscriberID: subscriberID
      }).then((response) => {
        console.log(response.data)
        if (response.data) {
          alert("Subscription rejection successful");
          window.location.reload();
        } else {
          alert("Subscription rejection failed");
        }
      });
    }
    
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pl-72 w-full h-full flex flex-col bg-gray-900">
          <div className="bg-gradient-to-b from-violet-500 to-gray-900">
          <button onClick={logout} className='fa-fa-user float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 mx-4'>logout</button>
            <h1 className="text-5xl text-white font-bold text-center pt-12 pb-8">Subscription Request</h1>
          </div>
          <div className="w-full flex flex-col min-h-screen sm:px-4 items-center">
            <table className="w-4/5 whitespace-nowrap">
              <thead>
                <tr
                  tabIndex="0"
                  className="focus:outline-none h-10 w-full text-lg leading-none border-b text-white"
                >
                  <th className="font-bold text-left pl-5 columns-auto">User ID</th>
                  <th className="font-bold text-left pl-5">Artist Name</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="w-full">
                {
                  this.state.loading === true
                  ? <tr><td className="text-white text-center pt-3" colspan="3">Loading...</td></tr>
                  : currentPosts.map((item) => (
                  <tr
                    tabIndex="0"
                    className="focus:outline-none h-10 w-full text-base leading-none text-white text-left transition duration-300 ease-in-out hover:bg-gray-800"
                  >
                    <td className="pl-5 text-white">{item.subscriber_id}</td>
                    <td className="pl-5 text-white">{item.creator_name}</td>
                    <td className="flex items-center justify-end">
                      <button 
                        id={item.subscriber_id} 
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2"
                        onClick={(e) => {
                          handleApprove(item.creator_id, item.subscriber_id);
                        }}
                        >
                        <p className="text-sm font-medium leading-none text-white">
                          Approve
                        </p>
                      </button>
                      <button 
                        id={item.subscriber_id}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 mx-4"
                        onClick={(e) => {
                          handleReject(item.creator_id, item.subscriber_id);
                        }}
                      >
                        <p className="text-sm font-medium leading-none text-white">
                          Reject
                        </p>
                      </button>
                    </td>
                  </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="w-full flex justify-center">
              {
              pageNumbers.length > 1
              ? pageNumbers.map((number,index) => (
                  <span key={index} className={number === this.state.currentPage ? "cursor-pointer flex items-center justify-center w-8 h-8 border-2 rounded-full bg-white text-black text-xs mx-1 my-2" : "cursor-pointer flex items-center justify-center w-8 h-8 border-2 rounded-full text-white text-xs mx-1 my-2"} onClick={() => {paginate(number)}}>
                    {number}
                  </span>
                ))
              : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SubscriptionReq;