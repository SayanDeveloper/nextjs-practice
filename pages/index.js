import { MongoClient } from 'mongodb';

import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

// const MeetupListObj = [
//   {
//     id: 'meet1',
//     title: 'sample meetup 1',
//     image: 'https://assets.leetcode.com/users/images/64e7e7fe-de92-4d45-a8ce-dfd4a4651413_1631074567.1577404.webp',
//     address: 'sample address'
//   },
//   {
//     id: 'meet2',
//     title: 'sample meetup 2',
//     image: 'https://assets.leetcode.com/users/images/64e7e7fe-de92-4d45-a8ce-dfd4a4651413_1631074567.1577404.webp',
//     address: 'sample address 2'
//   },
// ]

function HomePage(props) {
  
  return (
    <Fragment>
      <Head>
        <title>Landing Page</title>
        <meta name='description' content='This is my first nextjs work' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// This runs in server side only
// export async function getServerSideProps(context) {
//   // getting client request, response
//   const req = context.req;
//   const res = context.res;
//   console.log(req.rawHeaders);
  
//   return {
//     props: {
//       meetups: MeetupListObj,
//     }
//   }
// }

// This runs while building the production build, revalidate key works as setInterval
export async function getStaticProps() {
  // const params = context.params;
  // console.log(params);

  // fetch from db
  const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.tkrsh.mongodb.net/next-meetups?retryWrites=true&w=majority`);
  const db = client.db();

  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find().toArray();
  
  client.close();

  return {
    // these props are fetched and statically then the html is generated on server side
    props: {
      meetups: meetups.map(each => ({
        title: each.title,
        image: each.image,
        address: each.address,
        id: each._id.toString()
      })),
    },
    // to re fetch the data in server side (unit is in seconds)
    revalidate: 3600
  }
}

// this is required to use context param in getStaticProps
// export async function getStaticPaths() {
//   return {
//     /* fallback: false means that nextjs will not have to apply intelligence to find for other dynamic path params
//     from that api, that means all the paths params are present in paths array
//     */
//     fallback: false,
//     // these paths will be pre fetched and rendered as html
//     paths: [
//       { params: {
//         meetupId: "meet1",
//       }},
//       { params: {
//         meetupId: "meet2",
//       }}
//     ]
//   }
// }

export default HomePage;
