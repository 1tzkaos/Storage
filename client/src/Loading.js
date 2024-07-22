// UNSAFE_componentWillMount = () => {
//   if (window.localStorage.getItem("passwords") === null) {
//     window.localStorage.setItem("passwords", JSON.stringify([]));
//     this.setState({
//       passwords: [],
//     });
//   } else {
//     this.setState({
//       passwords: JSON.parse(window.localStorage.getItem("passwords")),
//     });
//   }
//   if (
//     crypto
//       .createHash("sha256")
//       .update(localStorage.getItem("token"))
//       .digest("hex") === localStorage.getItem("owner") &&
//     window.localStorage.getItem("user_token") !== null
//   ) {
//     console.log(
//       crypto
//         .createHash("sha256")
//         .update(localStorage.getItem("token"))
//         .digest("hex"),
//       localStorage.getItem("owner")
//     );
//     console.log("login 2");
//     this.state.owner = localStorage.getItem("owner");
//     this.state.token = localStorage.getItem("token");
//     this.getFoldersAndFiles();
//   } else if (window.localStorage.getItem("user_token") == null) {
//     console.log("login 3");
//     window.location.href = "/login";
//   } else {
//     console.log("login 4");
//     window.location.href = "/login";
//   }

//   if (window.localStorage.getItem("message1") === null) {
//     if (this.getParent() === "/") {
//       var msg = "";
//       if (this.state.isMobile === false) {
//         msg = "Right click on file/folder for more actions";
//       } else {
//         msg = "Long press on file/folder for more actions";
//       }
//       message.info(msg, 6);
//     }

//     window.localStorage.setItem("message1", "true");
//   }
// };

import React, { useState, useEffect } from "react";

function LoadingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set the duration of the loading screen here (3000ms = 3 seconds)

    return () => clearTimeout(timer);
  }, []);

  const appStyles = {
    transition: "opacity 1s ease-in-out",
    opacity: loading ? 1 : 0,
  };

  const loadingScreenStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  };

  const contentStyles = {
    padding: "20px",
  };

  return (
    <div style={appStyles}>
      {loading ? (
        <div style={loadingScreenStyles}>
          {/* You can replace this with your own loading animation */}
          <h1>Loading...</h1>
        </div>
      ) : (
        <div style={contentStyles}>
          {/* Your website content goes here */}
          <h1>Welcome to my website!</h1>
        </div>
      )}
    </div>
  );
}

export default LoadingPage;
