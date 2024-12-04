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

  if (searchId === "") {
    document.getElementById("error1").style.display = "block";
  } else {
    document.getElementById("error1").style.display = "none";
    document.getElementById("error2").style.display = "none";

    let playerData;

    try {
      const response = await fetch(
        `http://localhost:4000/getPlayerName?id=${searchId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      playerData = data;

      if (!playerData || playerData.length === 0) {
        throw new Error("Player not found or data is empty.");
      }

      let confirmation1 = `Are you sure you want to ban ${playerData[0].name}? \nConfirm or Cancel.`;
      if (confirm(confirmation1) === true) {
        const postResponse = await fetch(`http://localhost:4000/banPlayer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: searchId }),
        });

        if (!postResponse.ok) {
          throw new Error(`Failed to ban: ${postResponse.status}`);
        }
        alert(`You have successfully banned ${playerData[0].name}`);
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

    try {
      const response = await fetch(
        `http://localhost:4000/getPlayerName?id=${searchId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      playerData = data;

      if (!playerData || playerData.length === 0) {
        throw new Error("Player not found or data is empty.");
      }

      let confirmation2 = `Are you sure you want to unban ${playerData[0].name}? \nConfirm or Cancel.`;
      if (confirm(confirmation2) === true) {
        const postResponse = await fetch(`http://localhost:4000/unbanPlayer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: searchId }),
        });

        if (!postResponse.ok) {
          throw new Error(`Failed to unban: ${postResponse.status}`);
        }

        alert(`You have successfully unbanned ${playerData[0].name}`);
      } else {
        alert(`You have cancelled the unban.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(`An error occurred: ${error.message}`);
    }
  }
});

document.getElementById("lobbySearch").addEventListener("keypress", async (e) => {
    if(e.key == "Enter") {
        let lobbySearch = document.getElementById("lobbySearch").value;
        if (lobbySearch == ""){
            document.getElementById("error3").style.display = "block";
        } else {
            document.getElementById("error3").style.display = "none";

        try {
            // Add logic here
        } catch (error) {
            console.error("An error occurred:", error);
            alert(`An error occurred: ${error.message}`);
        }
        }
    }
}); 