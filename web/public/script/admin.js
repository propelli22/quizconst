const currectaddress = window.location.origin;

document
  .getElementById("admin-settings-button")
  .addEventListener("click", () => {
    adminModal.style.display = "block";
  });

document.getElementById("admin-close-button").addEventListener("click", () => {
  adminModal.style.display = "none";
});

document.getElementById("banButton").addEventListener("click", async () => {
  let searchId = document.getElementById("playerSearch").value;

  // Verify that input is not empty
  if (searchId === "") {
    document.getElementById("error1").style.display = "block";
  } else {
    document.getElementById("error1").style.display = "none";
    document.getElementById("error2").style.display = "none";

    let playerData;

// Send data a ban request
    try {
        let postResponse;
        await fetch(`${currectaddress}/getUserBan`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: searchId })
        })
        .then(Response => Response.json())
        .then(data => postResponse = data);

        console.log(postResponse)

      const data = postResponse;
      playerData = data;

// Verify that the input is actually in the data
      if (!playerData || playerData.length === 0) {
        throw new Error("Player not found or data is empty.");
      }

// Confirmation on the ban request
      let confirmation1 = `Are you sure you want to ban ${playerData[0][0].name}? \nConfirm or Cancel.`;
      if (confirm(confirmation1) === true) {
        let postResponse;
        const banResponse = await fetch(`${currectaddress}/getUserBan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: searchId }),
        })
        .then(Response => Response.json())
        .then(data => postResponse = data);

// Check if the request was unsuccesful
        if (!banResponse.ok) {
            throw new Error("Failed to ban player");
          }

        alert(`You have successfully banned ${playerData[0][0].name}`);
      } else {
        alert(`You have cancelled the ban.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(`An error occurred: ${error.message}`);
    }
  }
});

document.getElementById("unbanButton").addEventListener("click", async () => {
  let searchId = document.getElementById("playerSearch").value;

  if (searchId === "") {
    document.getElementById("error2").style.display = "block";
  } else {
    document.getElementById("error1").style.display = "none";
    document.getElementById("error2").style.display = "none";

    let playerData;

    // Send data a unban request
    try {
      const response = await fetch(`${currectaddress}/getUserUnban`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: searchId }),
      });
      

      // Verify that the input is actually in the data
      if (!response.ok) {
        throw new Error("Failed to fetch player data");
      }

      const data = await response.json();
      playerData = data;

      if (!playerData || playerData.length === 0) {
        throw new Error("Player not found or data is empty.");
      }
// Confirmation on the unban request
      let confirmation2 = `Are you sure you want to unban ${playerData[0][0].name}? \nConfirm or Cancel.`;
      if (confirm(confirmation2) === true) {
        const unbanResponse = await fetch(`${currectaddress}/getUserUnban`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: searchId }),
        });
// Check if the request was unsuccesful
        if (!unbanResponse.ok) {
          throw new Error("Failed to unban player");
        }

        alert(`You have successfully unbanned ${playerData[0][0].name}`);
      } else {
        alert(`You have cancelled the unban.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(`An error occurred: ${error.message}`);
    }
  }
});

// Search for lobby from data
document.getElementById("lobbySearch").addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        let lobbySearch = document.getElementById("lobbySearch").value;
        if (lobbySearch === "") {
            document.getElementById("error3").style.display = "block";
        } else {
            document.getElementById("error3").style.display = "none";

            try {
                 let lobbyData = await fetch(`${currectaddress}/getLobbyName`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ id: lobbySearch }),
                });
                if (!lobbyData.ok) {
                    throw new Error(`Server error: ${lobbyData.status}`);
                }

                // Show the lobby if found
                const data = await lobbyData.json();
                const lobbyResults = document.getElementById("lobbyResults");
                lobbyResults.innerHTML = "";
                if (data && data.length > 0) {
                    data.forEach(lobby => {
                        const lobbyContainer = document.createElement("div");
                        lobbyContainer.className = "lobby-container";
                        lobbyContainer.innerHTML = `
                            <p id="lobbyName">${data[0].lobby_name}</p>
                            <button id="deleteLobbyButton" type="button">Delete Lobby</button>`;
                        lobbyResults.appendChild(lobbyContainer);

                        // Delete the lobby from existance
                        document.getElementById("deleteLobbyButton").addEventListener("click", async () => {
                            let deleteValue = document.getElementById("lobbyName").value

                            const response = await fetch(`${currectaddress}/deleteLobby`, {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ id: deleteValue })
                              });
                              const dataDelete = await response.json()
                              console.log(dataDelete)
                        });
                    });
                } else {
                    lobbyResults.innerHTML = "<p>No lobbies found.</p>";
                }


            } catch (error) {
                console.error("An error occurred:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    }
});