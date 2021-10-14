import React, { useState } from "react";

const App = () => {
    const [band, setBand] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [albums, setAlbums] = useState([]);
    // Note: currentUser is an object with "username" property
    // Later we may add extra properties!
    const [currentUser, setCurrentUser] = useState({ username: "" })
    // Use these state variables to control the value of the login inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Every time we update the "albums" state variable we will automatically re-render the app...
    // When this happens, map the new version of "albums"...
    // ... and create a new list item for every album, which we can render in the <ul> in our JSX
    const renderedAlbums = albums.map(album => {
        let albumDetails = `${album.title} by ${album.band} (${album.year}) - added by ${currentUser.username}`;
        return <li key={album.id}>{albumDetails}</li>
    })

    // Function to change the state variable corresponding to a form input the user tried to change
    const changeData = event => {
        let newValue = event.target.value;

        switch (event.target.name) {
            case "band":
                setBand(newValue);
                break;
            case "title":
                setTitle(newValue);
                break;
            case "year":
                setYear(newValue);
                break;
            case "username":
                setUsername(newValue);
                break;
            case "password":
                setPassword(newValue);
                break;
            default:
                break;
        }
    }

    // Function to submit the form to our server using a POST request
    const submitForm = event => {
        event.preventDefault();

        // Create new album object
        const newAlbum = {
            band: band,
            title: title,
            year: year
        }

        // "Translate" the object into a JSON string
        const jsonNewAlbum = JSON.stringify(newAlbum);

        // Set up the post request we will shortly make
        const settings = {
            method: "POST",
            body: jsonNewAlbum,
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Make a post request to our server, including the new data in req.body
        fetch("http://localhost:3000/new-album", settings)
            .then(response => response.json())
            .then(data => {
                // When we have received our response from the server, and "translated" it back to standard JS
                // Update the "albums" state variable
                setAlbums(data);
                // Reset the values of the inputs
                setBand("");
                setTitle("");
                setYear("");
                // Log the array of albums we received back from the server
                console.log(data);
                //alert("Success! You can now submit another album");
            })
    }

    // Handle submitting login details
    const submitLoginData = event => {
        event.preventDefault();

        const loginDetails = {
            username: username,
            password: password
        }

        const jsonLoginDetails = JSON.stringify(loginDetails);

        const settings = {
            method: "POST",
            body: jsonLoginDetails,
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch("http://localhost:3000/login", settings)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCurrentUser(data)  // object with "username" property
        })
    }

    // Conditional rendering
    return (
        <div>
            { currentUser.username.length === 0 
            ? <div>
                <h1>Login to Add an Album</h1>

                <form onSubmit={submitLoginData}>
                    <div>
                        <label>Username</label>
                        <input name="username" onChange={changeData} value={username} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" onChange={changeData} value={password} />
                    </div>

                    <button>Sign In</button>
                </form>
            </div>
            
            : <div>
                <h1>Add an Album to the Collection!</h1>

                <form onSubmit={submitForm}>
                    <div>
                        <label>Band</label>
                        <input name="band" onChange={changeData} value={band} />
                    </div>
                    <div>
                        <label>Title</label>
                        <input name="title" onChange={changeData} value={title} />
                    </div>
                    <div>
                        <label>Year</label>
                        <input name="year" onChange={changeData} value={year} />
                    </div>
                    <button>Submit Album</button>
                </form>

                <div>
                    <h2>Current Albums:</h2>

                    <ul>
                        {renderedAlbums}
                    </ul>
                </div>
            </div>
            }
        </div>
    )
}

export default App;