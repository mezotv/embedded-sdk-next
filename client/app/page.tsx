import Image from "next/image";

// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";

async function Auth() {
  "use server";


// Instantiate the SDK
const discordSdk = new DiscordSDK(process.env.DISCORD_CLIENT_ID as string);

// Will eventually store the authenticated user's access_token
let auth;

setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
  
  // We can now make API calls within the scopes we requested in setupDiscordSDK()
  // Note: the access_token returned is a sensitive secret and should be treated as such
});

async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: process.env.DISCORD_CLIENT_ID as string,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
    ],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}
}

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-8 text-center">
    <Image src="/rocket.png" height={280} width={400} className="logo" alt="Discord" />
    <h1 className="text-4xl leading-tight">Hello, World!</h1>
  </div>
  );
}
