// src/app/test/page.js
import connectDB from '@/lib/db';

export default async function TestPage() {
  await connectDB();

  return (
    <div>
      <h1>MongoDB Connection Success!</h1>
    </div>
  );
}
