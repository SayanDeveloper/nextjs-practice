import {MongoClient, ObjectId} from 'mongodb';

import {useRouter} from 'next/router';
import Head from 'next/head';
import MeetupDetails from '../../components/meetups/MeetupDetails';

function MeetupDetail(props) {
    const router = useRouter();
    console.log(router.query);
    // console.log(props.meetup);

    return (
        <>
            <Head>
                <title>{props.meetup.title}</title>
            </Head>
            <MeetupDetails 
                image={props.meetup.image}
                title={props.meetup.title}
                address={props.meetup.address}
                details={props.meetup.details}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.tkrsh.mongodb.net/next-meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupCollections = db.collection('meetups');

    const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
    
    client.close();

    return {
        fallback: false,
        paths: meetups.map((each) => ({ params: { meetupId: each._id.toString() } }))
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.tkrsh.mongodb.net/next-meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupCollections = db.collection('meetups');

    const selectedMeetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) });
    
    client.close();

    return {
        props: {
            meetup: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            },
        }
    }
}

export default MeetupDetail