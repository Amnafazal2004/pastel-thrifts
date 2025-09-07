This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

AUTHENTICATION NOTES 

"We connect MongoDB and set up the UserModel. Clerk handles login on frontend. Inngest listens to Clerk events and syncs user data into MongoDB. On the backend, we use getAuth() to get the currently logged-in user ID and then fetch their data from MongoDB using findById. That data is sent as API response, which the frontend can use."

 first we make a db where we connect with mongoo then we use useUser to seee if user has logged in or not and use opensignin method to get ui ux then to listen the events we  use ingest where we sync update delete , what inngest does is that it gets the id,username,email from clerk as defined in usermodel schema and then put that into the database now if user wants to get the userdetails then api route is crreated where get request is used , we use getauth to get the id of that user and then find that user through find id once we find it we send it as response, like the whole detail then we set that data 


 //TOKENS
 Where the Token Comes From
In your app, you’re using Clerk for authentication.
Clerk gives you access to this method:
const { getToken } = useAuth();
Which gives you a Bearer Token like:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...

🛡️ How You Use It
In the frontend (when sending a request):
await axios.post('/api/products', formData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
In the backend (your API route):
import { getAuth } from '@clerk/nextjs/server';
const { userId } = getAuth(request);  // ✅ Validates the token!
This line checks the token and gives you the userId of the logged-in user.



export async function GET(request){
    const {userId} = getAuth(request)
    await connectDB()
    const products = await ProductModel.find({});
    return NextResponse.json({ products })

}

at frontend 
 const {getToken} = useThriftContext()

const token = await getToken()
  const { data } = await axios.get('/api/products/allproducts', { headers: { Authorization: `Bearer ${token}` } });


 useAuth() – FRONTEND
What it does
It’s a React hook for the browser that lets you know:
Is the user logged in? (isSignedIn)
What is their userId?
Can I get their token (getToken()) for API calls?

useUser() – FRONTEND
What it does
Another frontend hook, but instead of just userId, it gives you full profile info about the user.
Also frontend only.
Gives full user object with ID, email, name, profile pic, etc.
Slower than useAuth() because it fetches more data.

etAuth(request) – BACKEND
What it does
This is server-side and works in:
Next.js API routes (/api/.../route.js)

Reads the incoming request, looks for:
Authorization: Bearer <token> header, OR
Clerk session cookie
Verifies it with Clerk, and returns:

userId
sessionId
getToken() (server-side)