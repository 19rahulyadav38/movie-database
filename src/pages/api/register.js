import NextAuth from 'next-auth';
import { Providers } from 'next-auth';
import bcrypt from 'bcrypt';
import { connectDatabase } from '../../../db/db'; // Update with the actual path

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const db = await connectDatabase();

        // Check if the email is taken
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
          return Promise.resolve(null);
        }

        // Hash the password (you should use a more secure method in a real-world scenario)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user details to the database
        const newUser = {
          email,
          password: hashedPassword,
        };

        await db.collection('users').insertOne(newUser);

        // Return the user object
        return Promise.resolve({ email });
      },
      async jwt(token, user) {
        // If a user is found, add it to the token
        if (user) {
          token.id = user.email; // You can customize the token payload
        }
        return token;
      },
      async session(session, token) {
        // Add user data to the session
        session.user = token;
        return session;
      },
    }),
  ],
});
