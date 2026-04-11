// App.jsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import axios from 'axios'
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { getToken } = useAuth();

  const checkingTheAuth = async () => {
    try {
      const token = await getToken();
      const result = await axios.post(
        `http://localhost:8000/api/user/register`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("result : ", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <h1>Dashboard</h1>
        <button onClick={checkingTheAuth}>checkin the auth</button>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default App;