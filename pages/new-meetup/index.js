import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
  const router = useRouter();
    async function addMeetupHandler(data) {
        // const res = axios.post("/api/new-meetup", data);
        const res = await fetch('/api/new-meetup', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const resData = await res.json();
        console.log(resData);
        router.push("/");
    }

    return (
      <>
          <Head>
            <title>Add a new meetup in nextjs</title>
          </Head>
          <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </>
    )
}

export default NewMeetup